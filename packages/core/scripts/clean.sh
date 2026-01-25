#!/bin/bash

# =========================================================================
# SYNOPSIS
#    High-Velocity Two-Phase PNPM Purge with Brutal Verification.
# DESCRIPTION
#    Uses xargs for parallel execution (Runspace equivalent), rm for deletion, 
#    and a 3-retry forced-kill loop for stubborn node_modules.
# =========================================================================

set -o pipefail

# -------------------------------------------------------------------------
# 0. CONFIGURATION & COLORS
# -------------------------------------------------------------------------
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
GRAY='\033[0;90m'
DARKRED='\033[0;31m' # Standard Red is often the closest to DarkRed in terminals
NC='\033[0m' # No Color

# -------------------------------------------------------------------------
# 1. UTILITIES
# -------------------------------------------------------------------------

stop_locking_processes() {
    echo -e "${RED}[!] Escalating: Killing Node/VS Code to release file locks...${NC}"
    # Using pkill -f to match command lines, similar to Get-Process names
    # Silencing errors if processes aren't found
    pkill -f "node" > /dev/null 2>&1 || true
    pkill -f "Code" > /dev/null 2>&1 || true
    sleep 1
}

invoke_fast_delete() {
    local target_file=$1
    local label=$2
    
    # Calculate CPU threads * 2 for high concurrency (matching PS script)
    local cpu_count
    if [[ "$OSTYPE" == "darwin"* ]]; then
        cpu_count=$(sysctl -n hw.ncpu)
    else
        cpu_count=$(nproc)
    fi
    local max_threads=$((cpu_count * 2))

    local total_lines
    total_lines=$(wc -l < "$target_file")
    
    # Visual feedback isn't strictly per-file in xargs, so we print the start
    # Replicating the 'Nuking' status vibe
    echo -e "${YELLOW}Running $label on $total_lines items with $max_threads threads...${NC}"

    # xargs -P replicates the RunspacePool parallelism.
    # rm -rf replicates cmd /c rd /s /q
    # -I {} replaces {} with the path line
    cat "$target_file" | xargs -P "$max_threads" -I {} rm -rf "{}"
}

# -------------------------------------------------------------------------
# 2. MAIN EXECUTION
# -------------------------------------------------------------------------

echo -e "${MAGENTA}--- LIGHTNING PNPM PURGE: NO MERCY EDITION ---${NC}"
start_time=$(date +%s)

# --- PHASE 1: Initial Nuke ---
echo -e "${CYAN}[1/3] Scanning for targets...${NC}"

# Create a temporary file to hold targets (simulating the array)
targets_file=$(mktemp)

# Find node_modules directories and pnpm-lock.yaml files
# -prune on node_modules prevents listing nested node_modules (optimizes find),
# but to replicate the PS script "Recurse" exactly, we don't prune, 
# though rm -rf on parent handles children anyway.
find . -name "node_modules" -type d -print > "$targets_file"
find . -name "pnpm-lock.yaml" -type f -print >> "$targets_file"

target_count=$(wc -l < "$targets_file")

if [ "$target_count" -gt 0 ]; then
    echo -e "${YELLOW}Found $target_count items. Starting Parallel Nuke...${NC}"
    invoke_fast_delete "$targets_file" "Phase 1: Initial Purge"
fi

# --- PHASE 2: Brutal Verification Loop ---
echo -e "${CYAN}[2/3] Verifying cleanup integrity...${NC}"
retry_count=0
max_retries=3

while [ $retry_count -lt $max_retries ]; do
    # Check for survivors
    survivors_file=$(mktemp)
    find . -name "node_modules" -type d -print > "$survivors_file"
    survivor_count=$(wc -l < "$survivors_file")

    if [ "$survivor_count" -eq 0 ]; then
        echo -e "${GREEN}Verification Passed: All node_modules purged.${NC}"
        rm -f "$survivors_file"
        break
    fi

    ((retry_count++))
    echo -e "${RED}[!] ALERT: $survivor_count folders survived! (Retry $retry_count/$max_retries)${NC}"

    # Kill processes on retry
    stop_locking_processes

    # Brutal Recursive delete on survivors
    invoke_fast_delete "$survivors_file" "Phase 2: Brutal Retry $retry_count"
    rm -f "$survivors_file"
done

# Final check after retries
if [ "$(find . -name "node_modules" -type d | wc -l)" -gt 0 ]; then
    echo -e "${DARKRED}CRITICAL: Some folders are STILL locked by the OS. Manual intervention may be required.${NC}"
fi

# Cleanup temp file
rm -f "$targets_file"

# --- PHASE 3: Handoff ---
end_time=$(date +%s)
elapsed=$((end_time - start_time))
echo -e "${GREEN}[3/3] Process finished in ${elapsed}s.${NC}"

echo -n -e "${CYAN}\nWould you like to trigger a fresh reinstallation? (Y/N)${NC} "
# Read single key, no echo (equivalent to RawUI.ReadKey)
read -n 1 -s key
echo "" # Newline after input

if [[ "$key" == "y" || "$key" == "Y" ]]; then
    echo -e "\n${GREEN}Starting Smart Install...${NC}"
    # Adaptation: Checks for .sh script first, falls back to .ps1 if pwsh exists, 
    # to maintain "Functionality Replication" across OS types.
    if [ -f "./scripts/install.sh" ]; then
        ./scripts/install.sh
    elif [ -f "./scripts/install.ps1" ] && command -v pwsh &> /dev/null; then
        pwsh ./scripts/install.ps1
    else
        echo -e "${RED}Error: ./scripts/install.sh (or .ps1) not found!${NC}"
    fi
else
    echo -e "\n${GRAY}Exiting.${NC}"
fi