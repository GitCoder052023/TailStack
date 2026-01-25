#!/bin/bash

# -------------------------------------------------------------------------
# 1. SETUP & SAFETY CHECKS
# -------------------------------------------------------------------------

# Exit on error (except inside conditionals), undefined vars, and pipe failures
set -u
set -o pipefail

# Trap Ctrl+C to clean up background jobs before exiting
trap cleanup SIGINT SIGTERM

cleanup() {
    echo -e "\n\n[WARN] Script interrupted. Killing running jobs..."
    for pid in "${running_pids[@]}"; do
        kill -9 "$pid" 2>/dev/null || true
    done
    exit 1
}

# -------------------------------------------------------------------------
# 2. ROBUST HELPER FUNCTIONS
# -------------------------------------------------------------------------

# Get-Metrics: Calculates CPU and RAM usage
# Returns: global vars CURRENT_CPU, CURRENT_RAM, FREE_RAM_MB
get_metrics() {
    # 1. Memory Usage (using free or /proc/meminfo)
    # Parse /proc/meminfo for accuracy equivalent to CIM
    local mem_total_kb=$(grep MemTotal /proc/meminfo | awk '{print $2}')
    local mem_avail_kb=$(grep MemAvailable /proc/meminfo | awk '{print $2}')
    
    if [[ -z "$mem_avail_kb" ]]; then
        # Fallback for older kernels without MemAvailable
        local mem_free_kb=$(grep MemFree /proc/meminfo | awk '{print $2}')
        local buffers_kb=$(grep Buffers /proc/meminfo | awk '{print $2}')
        local cached_kb=$(grep ^Cached /proc/meminfo | awk '{print $2}')
        mem_avail_kb=$((mem_free_kb + buffers_kb + cached_kb))
    fi

    # Calculate percentages (integer math)
    local used_kb=$((mem_total_kb - mem_avail_kb))
    CURRENT_RAM=$(( (used_kb * 100) / mem_total_kb ))
    FREE_RAM_MB=$(( mem_avail_kb / 1024 ))

    # 2. CPU Usage (parsing /proc/stat for instantaneous load)
    # Read 1
    read -r cpu a1 b1 c1 d1 e1 f1 g1 rest < /proc/stat
    local total1=$((a1 + b1 + c1 + d1 + e1 + f1 + g1))
    local idle1=$d1

    # Tiny sleep to measure delta (matches the sleep in PS script)
    sleep 0.1

    # Read 2
    read -r cpu a2 b2 c2 d2 e2 f2 g2 rest < /proc/stat
    local total2=$((a2 + b2 + c2 + d2 + e2 + f2 + g2))
    local idle2=$d2

    local total_delta=$((total2 - total1))
    local idle_delta=$((idle2 - idle1))
    
    # Avoid divide by zero
    if (( total_delta == 0 )); then
        CURRENT_CPU=0
    else
        local used_delta=$((total_delta - idle_delta))
        CURRENT_CPU=$(( (used_delta * 100) / total_delta ))
    fi
}

# Suspend-JobTree: Sends SIGSTOP to the process group
suspend_job() {
    local pid=$1
    if kill -0 "$pid" 2>/dev/null; then
        # Sending to process group ensures children (node/pnpm) also pause
        kill -SIGSTOP "$pid" 2>/dev/null || true
    fi
}

# Resume-JobTree: Sends SIGCONT to the process group
resume_job() {
    local pid=$1
    if kill -0 "$pid" 2>/dev/null; then
        kill -SIGCONT "$pid" 2>/dev/null || true
    fi
}

# -------------------------------------------------------------------------
# 3. MAIN EXECUTION BLOCK
# -------------------------------------------------------------------------

echo -e "\e[36m---  PNPM ORCHESTRATOR ---\e[0m"

# --- 3.1 Dependencies Check ---
if ! command -v pnpm &> /dev/null; then
    echo "pnpm is not found in PATH. Please install Node/PNPM first."
    exit 1
fi

# --- 3.2 File Discovery ---
echo -n "Scanning for package.json..."
# Find package.json files, ignoring node_modules to keep it sane
# Use mapfile to load into array safely handling spaces
mapfile -t package_files < <(find . -type d -name "node_modules" -prune -o -type f -name "package.json" -print)

count=${#package_files[@]}

if [[ $count -eq 0 ]]; then
    echo -e "\e[33m None found.\e[0m"
    exit 0
fi
echo -e "\e[32m Found $count projects.\e[0m"

# --- 3.3 Safe Initialization ---

# Job Queue (Source array)
job_queue=("${package_files[@]}")

# Tracking Arrays
running_pids=()
running_paths=()
completed_jobs_status=()
completed_jobs_path=()

# Configuration
logical_cores=$(nproc)
if [[ -z "$logical_cores" ]]; then logical_cores=4; fi

CRITICAL_THRESHOLD=90
SAFE_THRESHOLD=75
SYSTEM_STATE="RUNNING"

# --- 3.4 The Orchestration Loop ---

while [[ ${#job_queue[@]} -gt 0 || ${#running_pids[@]} -gt 0 ]]; do

    # A. Telemetry
    get_metrics

    # B. Clean up finished jobs
    # We iterate backwards to remove items safely without messing up indices
    for (( i=${#running_pids[@]}-1; i>=0; i-- )); do
        pid="${running_pids[$i]}"
        path="${running_paths[$i]}"

        # Check if process is still running (signal 0)
        if ! kill -0 "$pid" 2>/dev/null; then
            # Wait on the specific PID to get the exit code
            wait "$pid"
            exit_code=$?

            if [[ $exit_code -eq 0 ]]; then
                status="Success"
                color="\e[32m" # Green
            else
                status="Failed"
                color="\e[31m" # Red
            fi

            # Print status (Clear line first to not mess up dashboard)
            echo -e "\r\033[K\n[$status] $path"
            echo -e "$color$status: $path\e[0m"

            # Archive result
            completed_jobs_status+=("$status")
            completed_jobs_path+=("$path")

            # Remove from running arrays
            unset 'running_pids[i]'
            unset 'running_paths[i]'
        fi
    done

    # Re-index arrays to remove gaps caused by unset
    running_pids=("${running_pids[@]}")
    running_paths=("${running_paths[@]}")

    # C. Intelligent State Management (Hysteresis Loop)
    is_stressed=0
    if (( CURRENT_CPU >= CRITICAL_THRESHOLD || CURRENT_RAM >= CRITICAL_THRESHOLD )); then
        is_stressed=1
    fi

    is_relaxed=0
    if (( CURRENT_CPU <= SAFE_THRESHOLD && CURRENT_RAM <= SAFE_THRESHOLD )); then
        is_relaxed=1
    fi

    if [[ $is_stressed -eq 1 && "$SYSTEM_STATE" != "PAUSED" ]]; then
        echo -e "\r\033[K\n\e[33m[WARN] High Load (CPU:${CURRENT_CPU}% RAM:${CURRENT_RAM}%). Suspending...\e[0m"
        for pid in "${running_pids[@]}"; do
            suspend_job "$pid"
        done
        SYSTEM_STATE="PAUSED"
    elif [[ $is_relaxed -eq 1 && "$SYSTEM_STATE" == "PAUSED" ]]; then
        echo -e "\r\033[K\n\e[36m[INFO] Load Normalized. Resuming...\e[0m"
        for pid in "${running_pids[@]}"; do
            resume_job "$pid"
        done
        SYSTEM_STATE="RUNNING"
    fi

    # D. Spawn New Jobs (Only if RUNNING and Resources Available)
    if [[ "$SYSTEM_STATE" == "RUNNING" ]]; then
        # Dynamic Concurrency using `bc` for float comparison simulation or pure int logic
        # logic: load_factor = 1.0 - (cpu / 100). 
        # Easier in bash: remaining_cpu = 100 - CURRENT_CPU. 
        # If remaining < 10, treat as 10.
        
        remaining_capacity=$(( 100 - CURRENT_CPU ))
        if (( remaining_capacity < 10 )); then remaining_capacity=10; fi
        
        # dynamic_limit = floor(cores * remaining_capacity / 100)
        dynamic_limit=$(( (logical_cores * remaining_capacity) / 100 ))
        if (( dynamic_limit < 1 )); then dynamic_limit=1; fi

        while [[ ${#running_pids[@]} -lt $dynamic_limit && ${#job_queue[@]} -gt 0 && $FREE_RAM_MB -gt 500 ]]; do
            
            # Dequeue (shift array)
            next_file="${job_queue[0]}"
            job_queue=("${job_queue[@]:1}") # Remove first element
            
            work_dir=$(dirname "$next_file")
            
            echo -e "\r\033[K-> Start: $work_dir"
            
            # Robust Process Creation
            # We use a subshell to change dir, run pnpm silently, run in background
            (
                cd "$work_dir" || exit 1
                pnpm install > /dev/null 2>&1
            ) &
            new_pid=$!

            running_pids+=("$new_pid")
            running_paths+=("$work_dir")

            # Tiny buffer to let CPU register the new process load
            sleep 0.2
            get_metrics
        done
    fi

    # E. Dashboard Update
    # Calculate percent complete
    completed_count=${#completed_jobs_status[@]}
    if (( count > 0 )); then
        percent=$(( (completed_count * 100) / count ))
    else
        percent=0
    fi

    msg="CPU: ${CURRENT_CPU}% | RAM: ${CURRENT_RAM}% | Active: ${#running_pids[@]} | Queued: ${#job_queue[@]} | Progress: ${percent}%"
    
    # Use \r to return to start of line, does not print newline
    echo -ne "\r\e[35m[PNPM Orchestrator ($SYSTEM_STATE)] $msg \e[0m"
    
    sleep 1
done

echo -e "\n"
echo -e "\e[36m--- SUMMARY ---\e[0m"

success_count=0
fail_count=0

for status in "${completed_jobs_status[@]}"; do
    if [[ "$status" == "Success" ]]; then
        ((success_count++))
    else
        ((fail_count++))
    fi
done

echo -e "\e[32mSuccessful: $success_count\e[0m"
echo -e "\e[31mFailed:     $fail_count\e[0m"