<#
.SYNOPSIS
    Self-Adaptive Parallel PNPM Installer.
    Dynamically scales concurrency based on real-time hardware capacity.
#>

param (
    [int]$UserCeiling = 16,            # Absolute max limit
    [int]$RamPerJobMB = 800,           # Estimated RAM cost per install
    [int]$CpuThrottleThreshold = 85,   # % CPU: Stop queueing new jobs
    [int]$CpuCriticalThreshold = 96,   # % CPU: Kill switch
    [int]$MinOsRamMB = 1500            # Reserve this much RAM for the OS/GUI
)

# --- 1. Hardware Reconnaissance ---
$sysInfo = Get-CimInstance Win32_ComputerSystem
$LogicalCores = $sysInfo.NumberOfLogicalProcessors
Write-Host "Hardware Detected: $LogicalCores Logical Cores" -ForegroundColor Cyan

# Configuration
$SearchPath = (Get-Location).Parent.FullName
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
        $freeRam = $os.FreePhysicalMemory / 1024 
        return @{ CPU = [Math]::Round($cpu, 1); RAM = [Math]::Round($freeRam, 1) }
    }
    catch {
        return @{ CPU = 0; RAM = 9999 }
    }
}

# --- 3. Discovery Phase ---
Write-Host ("Scanning for package.json in: {0}" -f $SearchPath) -ForegroundColor Cyan
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

Write-Host ("Found {0} projects. Starting Engine..." -f $JobQueue.Count) -ForegroundColor Green
Start-Sleep -Seconds 1

# --- 4. Main Adaptive Loop ---
$LoopActive = $true

while ($LoopActive) {
    $metrics = Get-SystemMetrics
    $CpuLoad = $metrics.CPU
    $FreeRam = $metrics.RAM

    # Calculate Dynamic Capacity
    $ramForJobs = $FreeRam - $MinOsRamMB
    $slotsByRam = [Math]::Max(0, [Math]::Floor($ramForJobs / $RamPerJobMB))
    $DynamicLimit = [Math]::Min($slotsByRam, $LogicalCores)
    
    if ($DynamicLimit -gt $UserCeiling) { $DynamicLimit = $UserCeiling }
    if ($CpuLoad -gt $CpuThrottleThreshold) { $DynamicLimit = 0 }

    # Dashboard
    $color = "Green"
    if ($CpuLoad -gt $CpuThrottleThreshold) { $color = "Yellow" }
    if ($CpuLoad -gt $CpuCriticalThreshold) { $color = "Red" }

    $statusMsg = "[{0}] CPU: {1}% | RAM: {2}MB | Slots: {3}" -f @(
        [DateTime]::Now.ToString("HH:mm:ss"), 
        $CpuLoad, 
        $FreeRam, 
        $DynamicLimit
    )
    Write-Host $statusMsg -ForegroundColor $color
    
    $countsMsg = "Queue: {0} | Active: {1} | Done: {2}" -f $JobQueue.Count, $RunningJobs.Count, $CompletedJobs.Count
    Write-Host $countsMsg -ForegroundColor Gray

    # --- D. Critical Load Management ---
    if (($CpuLoad -ge $CpuCriticalThreshold) -or ($FreeRam -le 500)) {
        if ($RunningJobs.Count -gt 0) {
            Write-Host "!! SYSTEM OVERLOAD !! Shedding load..." -ForegroundColor Red
            
            $jobToKill = $RunningJobs[$RunningJobs.Count - 1]
            Stop-Job -Job $jobToKill.Job
            Remove-Job -Job $jobToKill.Job -Force
            
            if ($jobToKill.Data.Retries -lt $jobToKill.Data.MaxRetries) {
                $jobToKill.Data.Retries++
                $JobQueue.Enqueue($jobToKill.Data)
                Write-Host ("Re-queued: {0}" -f $jobToKill.Data.Path) -ForegroundColor Yellow
            } else {
                $FailedJobs.Add($jobToKill.Data)
            }
            $RunningJobs.RemoveAt($RunningJobs.Count - 1)
            Start-Sleep -Seconds 2 
            continue
        }
    }

    # --- E. Job Cleanup ---
    for ($i = $RunningJobs.Count - 1; $i -ge 0; $i--) {
        $wrapper = $RunningJobs[$i]
        if ($wrapper.Job.State -eq 'Completed') {
            Write-Host ("Done: {0}" -f $wrapper.Data.Path) -ForegroundColor Green
            $CompletedJobs.Add($wrapper.Data)
            Remove-Job -Job $wrapper.Job
            $RunningJobs.RemoveAt($i)
        }
        elseif ($wrapper.Job.State -eq 'Failed') {
            Write-Host ("Failed: {0}" -f $wrapper.Data.Path) -ForegroundColor Red
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

    # --- F. Scheduler ---
    while ($RunningJobs.Count -lt $DynamicLimit -and $JobQueue.Count -gt 0) {
        $nextTask = $JobQueue.Dequeue()
        Write-Host ("Spawning: {0}" -f $nextTask.Path) -ForegroundColor Cyan
        
        $scriptBlock = {
            param($path, $cmd, $args)
            Set-Location -Path $path
            & $cmd $args 2>&1 | Out-Null
        }
        
        $job = Start-Job -ScriptBlock $scriptBlock -ArgumentList $nextTask.Path, $ExecCommand, $ExecArgs
        $RunningJobs.Add([PSCustomObject]@{ Job = $job; Data = $nextTask })
    }

    if ($JobQueue.Count -eq 0 -and $RunningJobs.Count -eq 0) { $LoopActive = $false }
    Start-Sleep -Milliseconds 1200
}

Write-Host "`n--- EXECUTION COMPLETE ---" -ForegroundColor White
$finalMsg = "Success: {0} | Failed: {1}" -f $CompletedJobs.Count, $FailedJobs.Count
Write-Host $finalMsg -ForegroundColor Cyan