<#
.SYNOPSIS
    Self-Adaptive Parallel PNPM Installer.
    Dynamically scales concurrency based on real-time hardware capacity.
#>

param (
    [int]$UserCeiling = 16,            # Absolute max limit (e.g., don't go crazy on Threadrippers)
    [int]$RamPerJobMB = 800,           # Estimated RAM cost per install (Safe buffer)
    [int]$CpuThrottleThreshold = 85,   # % CPU: Stop queueing new jobs
    [int]$CpuCriticalThreshold = 96,   # % CPU: Kill switch
    [int]$MinOsRamMB = 1500            # Reserve this much RAM for the OS/GUI
)

# --- 1. Hardware Reconnaissance ---
$sysInfo = Get-CimInstance Win32_ComputerSystem
$LogicalCores = $sysInfo.NumberOfLogicalProcessors
Write-Host "🖥️  Hardware Detected: $LogicalCores Logical Cores" -ForegroundColor Cyan

# Configuration
$SearchPath = Get-Location
$ExecCommand = "pnpm"
$ExecArgs = "install"

# State Tracking
$JobQueue = [System.Collections.Generic.Queue[PSCustomObject]]::new()
$RunningJobs = [System.Collections.Generic.List[PSObject]]::new()
$CompletedJobs = [System.Collections.Generic.List[PSObject]]::new()
$FailedJobs = [System.Collections.Generic.List[PSObject]]::new()

# --- 2. Helper: Get Real-Time Metrics ---
function Get-SystemMetrics {
    try {
        $cpu = (Get-Counter '\Processor(_Total)\% Processor Time' -ErrorAction SilentlyContinue).CounterSamples.CookedValue
        $os = Get-CimInstance Win32_OperatingSystem
        $freeRam = $os.FreePhysicalMemory / 1024 # Convert KB to MB
        return @{ CPU = [Math]::Round($cpu, 1); RAM = [Math]::Round($freeRam, 1) }
    }
    catch {
        return @{ CPU = 0; RAM = 9999 } # Fallback
    }
}

# --- 3. Discovery Phase ---
Write-Host "🔍 Scanning for package.json files..." -ForegroundColor Cyan
$packageFiles = Get-ChildItem -Path $SearchPath -Recurse -Filter "package.json" -ErrorAction SilentlyContinue | 
                Where-Object { $_.FullName -notmatch "node_modules" }

if ($packageFiles.Count -eq 0) { Write-Host "No package.json files found."; exit }

foreach ($pkg in $packageFiles) {
    $JobQueue.Enqueue([PSCustomObject]@{
        Path = $pkg.Directory.FullName
        Retries = 0
        MaxRetries = 3
        ID = [Guid]::NewGuid().ToString()
    })
}

Write-Host "Found $($JobQueue.Count) projects. Starting Adaptive Engine..." -ForegroundColor Green
Start-Sleep -Seconds 1

# --- 4. Main Adaptive Loop ---
$LoopActive = $true

while ($LoopActive) {
    # A. Get Pulse
    $metrics = Get-SystemMetrics
    $CpuLoad = $metrics.CPU
    $FreeRam = $metrics.RAM

    # B. Calculate Dynamic Capacity (The Brain)
    # 1. Hardware Limit: Don't exceed cores
    # 2. Memory Limit: (FreeRAM - OS_Reserve) / CostPerJob
    $ramForJobs = $FreeRam - $MinOsRamMB
    if ($ramForJobs -lt 0) { $ramForJobs = 0 }
    
    $slotsByRam = [Math]::Floor($ramForJobs / $RamPerJobMB)
    $slotsByCpu = $LogicalCores

    # The computed limit for THIS second
    $DynamicLimit = [Math]::Min($slotsByRam, $slotsByCpu)
    
    # Respect user hard ceiling
    if ($DynamicLimit -gt $UserCeiling) { $DynamicLimit = $UserCeiling }
    
    # If CPU is throttling, capacity drops to 0 effectively for new jobs
    if ($CpuLoad -gt $CpuThrottleThreshold) { $DynamicLimit = 0 }

    # C. Status Dashboard
    # Determine color based on stress
    $color = "Green"
    if ($CpuLoad -gt $CpuThrottleThreshold) { $color = "Yellow" }
    if ($CpuLoad -gt $CpuCriticalThreshold) { $color = "Red" }

    Write-Host "[$([DateTime]::Now.ToString("HH:mm:ss"))] CPU: $CpuLoad% | RAM Free: $FreeRam MB | Capacity: $DynamicLimit slots" -ForegroundColor $color
    Write-Host "Queue: $($JobQueue.Count) | Active: $($RunningJobs.Count) | Done: $($CompletedJobs.Count)" -ForegroundColor Gray

    # D. Critical Load Management (Kill Switch)
    # If we are exceeding critical thresholds, we must shed load immediately
    if (($CpuLoad -ge $CpuCriticalThreshold) -or ($FreeRam -le 500)) {
        if ($RunningJobs.Count -gt 0) {
            Write-Host "⚠️  OVERLOAD ($CpuLoad% CPU / $FreeRam MB RAM). Shedding load..." -ForegroundColor Red
            
            # Kill the newest job first (LIFO logic often helps stabilize faster)
            $jobToKill = $RunningJobs[$RunningJobs.Count - 1]
            
            Stop-Job -Job $jobToKill.Job
            Remove-Job -Job $jobToKill.Job -Force
            
            if ($jobToKill.Data.Retries -lt $jobToKill.Data.MaxRetries) {
                $jobToKill.Data.Retries++
                $JobQueue.Enqueue($jobToKill.Data)
                Write-Host "   -> Killed & Re-queued: $($jobToKill.Data.Path)" -ForegroundColor Yellow
            } else {
                $FailedJobs.Add($jobToKill.Data)
            }
            $RunningJobs.RemoveAt($RunningJobs.Count - 1)
            
            Start-Sleep -Seconds 2 # Brief pause to let OS recover
            continue
        }
    }

    # E. Job Cleanup
    for ($i = $RunningJobs.Count - 1; $i -ge 0; $i--) {
        $wrapper = $RunningJobs[$i]
        if ($wrapper.Job.State -eq 'Completed') {
            Write-Host "✅ Done: $($wrapper.Data.Path)" -ForegroundColor Green
            $CompletedJobs.Add($wrapper.Data)
            Receive-Job -Job $wrapper.Job -Keep | Out-Null
            Remove-Job -Job $wrapper.Job
            $RunningJobs.RemoveAt($i)
        }
        elseif ($wrapper.Job.State -eq 'Failed') {
            Write-Host "❌ Failed: $($wrapper.Data.Path)" -ForegroundColor Red
            if ($wrapper.Data.Retries -lt $wrapper.Data.MaxRetries) {
                $wrapper.Data.Retries++
                $JobQueue.Enqueue($wrapper.Data)
            } else {
                $FailedJobs.Add($wrapper.Data)
            }
            Remove-Job -Job $wrapper.Job
            $RunningJobs.RemoveAt($i)
        }
    }

    # F. Dynamic Scheduler
    # We only spawn if we are UNDER the DynamicLimit calculated at step B
    while ($RunningJobs.Count -lt $DynamicLimit -and $JobQueue.Count -gt 0) {
        $nextTask = $JobQueue.Dequeue()
        Write-Host "🚀 Spawning: $($nextTask.Path)" -ForegroundColor Cyan
        
        $scriptBlock = {
            param($path, $cmd, $args)
            Set-Location -Path $path
            & $cmd $args 2>&1
        }
        
        $job = Start-Job -ScriptBlock $scriptBlock -ArgumentList $nextTask.Path, $ExecCommand, $ExecArgs
        $RunningJobs.Add([PSCustomObject]@{ Job = $job; Data = $nextTask })
    }

    # Exit Condition
    if ($JobQueue.Count -eq 0 -and $RunningJobs.Count -eq 0) { $LoopActive = $false }

    Start-Sleep -Milliseconds 1000
}

Write-Host "`n--- SUMMARY ---" 
Write-Host "Success: $($CompletedJobs.Count) | Failed: $($FailedJobs.Count)"