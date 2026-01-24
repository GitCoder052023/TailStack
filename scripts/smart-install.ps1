<#
.SYNOPSIS
    Robust Parallel PNPM Installer with Anti-Crash State Machine.
.DESCRIPTION
    Scans for package.json, runs pnpm install, and manages system load.
    Uses generic Enqueueing to avoid constructor overload errors.
    Uses CIM Instances for locale-agnostic hardware monitoring.
#>

# -------------------------------------------------------------------------
# 1. SETUP & SAFETY CHECKS
# -------------------------------------------------------------------------
$ErrorActionPreference = "Stop"

# Embed C# for low-level thread suspension (The "Magic" Pause Button)
$cSharpCode = @"
using System;
using System.Runtime.InteropServices;

public class ProcControl {
    [DllImport("kernel32.dll")]
    public static extern IntPtr OpenThread(int dwDesiredAccess, bool bInheritHandle, int dwThreadId);

    [DllImport("kernel32.dll")]
    public static extern int SuspendThread(IntPtr hThread);

    [DllImport("kernel32.dll")]
    public static extern int ResumeThread(IntPtr hThread);

    [DllImport("kernel32.dll")]
    public static extern int CloseHandle(IntPtr hObject);
}
"@

try {
    Add-Type -TypeDefinition $cSharpCode -Language CSharp -ErrorAction Stop
} catch {
    Write-Warning "Could not load C# types. System Suspend features might be limited."
}

# -------------------------------------------------------------------------
# 2. ROBUST HELPER FUNCTIONS
# -------------------------------------------------------------------------

function Get-Metrics {
    <#
    .DESCRIPTION
    Uses CIM/WMI instead of PerfCounters to ensure it works on ALL 
    Windows languages and versions without string parsing errors.
    #>
    try {
        $os = Get-CimInstance Win32_OperatingSystem -ErrorAction Stop
        $proc = Get-CimInstance Win32_Processor -ErrorAction Stop | Measure-Object -Property LoadPercentage -Average

        $totalRam = $os.TotalVisibleMemorySize # KB
        $freeRam = $os.FreePhysicalMemory      # KB
        
        # Calculate percentages safely
        if ($totalRam -gt 0) {
            $ramUsage = 100 - [math]::Round(($freeRam / $totalRam) * 100)
        } else {
            $ramUsage = 0
        }

        return @{
            CpuUsage  = [math]::Round($proc.Average)
            RamUsage  = $ramUsage
            FreeRamMB = [math]::Round($freeRam / 1024)
        }
    } catch {
        # Fallback if CIM fails (very rare)
        return @{ CpuUsage = 50; RamUsage = 50; FreeRamMB = 2048 }
    }
}

function Suspend-JobTree ($ProcessObject) {
    try {
        if ($ProcessObject -and -not $ProcessObject.HasExited) {
            foreach ($thread in $ProcessObject.Threads) {
                $hThread = [ProcControl]::OpenThread(0x0002, $false, $thread.Id)
                if ($hThread -ne [IntPtr]::Zero) {
                    [ProcControl]::SuspendThread($hThread) | Out-Null
                    [ProcControl]::CloseHandle($hThread) | Out-Null
                }
            }
        }
    } catch { <# Ignore permission errors to prevent script crash #> }
}

function Resume-JobTree ($ProcessObject) {
    try {
        if ($ProcessObject -and -not $ProcessObject.HasExited) {
            foreach ($thread in $ProcessObject.Threads) {
                $hThread = [ProcControl]::OpenThread(0x0002, $false, $thread.Id)
                if ($hThread -ne [IntPtr]::Zero) {
                    [ProcControl]::ResumeThread($hThread) | Out-Null
                    [ProcControl]::CloseHandle($hThread) | Out-Null
                }
            }
        }
    } catch { <# Ignore permission errors #> }
}

# -------------------------------------------------------------------------
# 3. MAIN EXECUTION BLOCK
# -------------------------------------------------------------------------

try {
    Write-Host "---  PNPM ORCHESTRATOR ---" -ForegroundColor Cyan

    # --- 3.1 Dependencies Check ---
    if (-not (Get-Command "pnpm" -ErrorAction SilentlyContinue)) {
        Throw "pnpm is not found in PATH. Please install Node/PNPM first."
    }

    # --- 3.2 File Discovery ---
    Write-Host "Scanning for package.json..." -NoNewline
    # Force array type @() to prevent 'single item' bugs
    $packageFiles = @(Get-ChildItem -Path . -Filter "package.json" -Recurse -ErrorAction SilentlyContinue)
    
    if ($packageFiles.Count -eq 0) {
        Write-Host " None found." -ForegroundColor Yellow
        exit
    }
    Write-Host " Found $($packageFiles.Count) projects." -ForegroundColor Green

    # --- 3.3 Safe Initialization (Fixing the Constructor Error) ---
    # We create empty collections and fill them manually to avoid constructor overload issues
    $jobQueue = New-Object System.Collections.Generic.Queue[System.IO.FileInfo]
    foreach ($file in $packageFiles) {
        $jobQueue.Enqueue($file)
    }

    $runningJobs = New-Object System.Collections.Generic.List[PSObject]
    $completedJobs = New-Object System.Collections.Generic.List[PSObject]
    
    # Configuration
    $logicalCores = (Get-CimInstance Win32_ComputerSystem).NumberOfLogicalProcessors
    if (-not $logicalCores) { $logicalCores = 4 } # Safe fallback

    $CriticalThreshold = 90  # Pause if > 90%
    $SafeThreshold = 75      # Resume if < 75%
    $SystemState = "RUNNING" # RUNNING | PAUSED

    # --- 3.4 The Orchestration Loop ---
    while ($jobQueue.Count -gt 0 -or $runningJobs.Count -gt 0) {
        
        # A. Telemetry
        $metrics = Get-Metrics

        # B. Clean up finished jobs
        # ToList() is used to safely iterate while modifying the original list
        $activeScan = $runningJobs | Where-Object { $_ } 
        foreach ($job in $activeScan) {
            if ($job.Process.HasExited) {
                $status = if ($job.Process.ExitCode -eq 0) { "Success" } else { "Failed" }
                $color = if ($status -eq "Success") { "Green" } else { "Red" }
                Write-Host "`n[$status] $($job.Path)" -ForegroundColor $color
                
                $completedJobs.Add([PSCustomObject]@{ Path = $job.Path; Status = $status })
                $runningJobs.Remove($job) | Out-Null
            }
        }

        # C. Intelligent State Management (Hysteresis Loop)
        $isStressed = ($metrics.CpuUsage -ge $CriticalThreshold) -or ($metrics.RamUsage -ge $CriticalThreshold)
        $isRelaxed  = ($metrics.CpuUsage -le $SafeThreshold) -and ($metrics.RamUsage -le $SafeThreshold)

        if ($isStressed -and $SystemState -ne "PAUSED") {
            Write-Host "`n[WARN] High Load (CPU:$($metrics.CpuUsage)% RAM:$($metrics.RamUsage)%). Suspending..." -ForegroundColor Yellow
            foreach ($job in $runningJobs) { Suspend-JobTree -ProcessObject $job.Process }
            $SystemState = "PAUSED"
        }
        elseif ($isRelaxed -and $SystemState -eq "PAUSED") {
            Write-Host "`n[INFO] Load Normalized. Resuming..." -ForegroundColor Cyan
            foreach ($job in $runningJobs) { Resume-JobTree -ProcessObject $job.Process }
            $SystemState = "RUNNING"
        }

        # D. Spawn New Jobs (Only if RUNNING and Resources Available)
        if ($SystemState -eq "RUNNING") {
            # Dynamic Concurrency: The busier the system, the fewer NEW jobs we start
            $loadFactor = 1.0 - ($metrics.CpuUsage / 100.0)
            if ($loadFactor -lt 0.1) { $loadFactor = 0.1 } # Minimum 10% capacity assumption
            
            $dynamicLimit = [math]::Floor($logicalCores * $loadFactor)
            if ($dynamicLimit -lt 1) { $dynamicLimit = 1 }

            # If we have slots and RAM, spawn process
            while ($runningJobs.Count -lt $dynamicLimit -and $jobQueue.Count -gt 0 -and $metrics.FreeRamMB -gt 500) {
                $nextFile = $jobQueue.Dequeue()
                $workDir = $nextFile.DirectoryName
                
                Write-Host "-> Start: $($nextFile.Directory.Name)" -ForegroundColor DarkGray
                
                # Robust Process Creation
                $pInfo = New-Object System.Diagnostics.ProcessStartInfo
                $pInfo.FileName = "cmd.exe"
                $pInfo.Arguments = "/c pnpm install"
                $pInfo.WorkingDirectory = $workDir
                $pInfo.WindowStyle = "Hidden"
                $pInfo.CreateNoWindow = $true
                
                try {
                    $proc = [System.Diagnostics.Process]::Start($pInfo)
                    $runningJobs.Add([PSCustomObject]@{
                        Path = $workDir
                        Process = $proc
                    })
                } catch {
                    Write-Host "Failed to start job in $workDir" -ForegroundColor Red
                }
                
                # Tiny buffer to let CPU register the new process load
                Start-Sleep -Milliseconds 200
                $metrics = Get-Metrics # Update local metrics immediately
            }
        }

        # E. Dashboard Update (Write-Progress is safer than spamming Console)
        $msg = "CPU: $($metrics.CpuUsage)% | RAM: $($metrics.RamUsage)% | Active: $($runningJobs.Count) | Queued: $($jobQueue.Count)"
        Write-Progress -Activity "PNPM Orchestrator ($SystemState)" -Status $msg -PercentComplete (($completedJobs.Count / $packageFiles.Count) * 100)
        
        Start-Sleep -Seconds 1
    }

    Write-Progress -Activity "PNPM Orchestrator" -Completed
    Write-Host "`n--- SUMMARY ---" -ForegroundColor Cyan
    $successCount = ($completedJobs | Where-Object { $_.Status -eq "Success" }).Count
    $failCount = ($completedJobs | Where-Object { $_.Status -eq "Failed" }).Count
    Write-Host "Successful: $successCount" -ForegroundColor Green
    Write-Host "Failed:     $failCount" -ForegroundColor Red

} catch {
    Write-Host "`n[FATAL ERROR] Script Crashed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Location: $($_.InvocationInfo.ScriptLineNumber)" -ForegroundColor Red
}