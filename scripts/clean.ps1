<#
.SYNOPSIS
    High-Velocity Two-Phase PNPM Purge with Brutal Verification.
.DESCRIPTION
    Uses Runspaces for speed, CMD for deletion, and a 3-retry 
    forced-kill loop for stubborn node_modules.
#>

$ErrorActionPreference = "Stop"

# -------------------------------------------------------------------------
# 1. UTILITIES
# -------------------------------------------------------------------------
function Stop-LockingProcesses {
    Write-Host "[!] Escalating: Killing Node/VS Code to release file locks..." -ForegroundColor Red
    Get-Process -Name "node", "Code" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 1
}

$NukeAction = {
    param($Path)
    try {
        if (Test-Path $Path) {
            if (Test-Path $Path -PathType Container) {
                cmd /c "rd /s /q `"$Path`"" 2>&1
            } else {
                cmd /c "del /f /q `"$Path`"" 2>&1
            }
        }
    } catch {}
}

function Invoke-FastDelete {
    param($Paths, $Label)
    $MaxThreads = [Environment]::ProcessorCount * 2
    $Pool = [RunspaceFactory]::CreateRunspacePool(1, $MaxThreads)
    $Pool.Open()
    $Jobs = New-Object System.Collections.Generic.List[PSObject]

    foreach ($P in $Paths) {
        $PS = [PowerShell]::Create().AddScript($NukeAction).AddArgument($P)
        $PS.RunspacePool = $Pool
        $Jobs.Add([PSCustomObject]@{ Handle = $PS.BeginInvoke(); Instance = $PS })
    }

    while ($Jobs.Handle.IsCompleted -contains $false) {
        $done = ($Jobs | Where-Object { $_.Handle.IsCompleted }).Count
        Write-Progress -Activity $Label -Status "Nuking: $done/$($Paths.Count)" -PercentComplete (($done/$Paths.Count)*100)
        Start-Sleep -Milliseconds 50
    }
    $Jobs | ForEach-Object { $_.Instance.EndInvoke($_.Handle); $_.Instance.Dispose() }
    $Pool.Close()
}

# -------------------------------------------------------------------------
# 2. MAIN EXECUTION
# -------------------------------------------------------------------------
Write-Host "--- LIGHTNING PNPM PURGE: NO MERCY EDITION ---" -ForegroundColor Magenta
$start = Get-Date

# --- PHASE 1: Initial Nuke ---
Write-Host "[1/3] Scanning for targets..." -ForegroundColor Cyan
$targets = @()
$targets += Get-ChildItem -Path . -Filter "node_modules" -Recurse -Directory -ErrorAction SilentlyContinue | Select-Object -ExpandProperty FullName
$targets += Get-ChildItem -Path . -Filter "pnpm-lock.yaml" -Recurse -File -ErrorAction SilentlyContinue | Select-Object -ExpandProperty FullName

if ($targets.Count -gt 0) {
    Write-Host "Found $($targets.Count) items. Starting Parallel Nuke..." -ForegroundColor Yellow
    Invoke-FastDelete -Paths $targets -Label "Phase 1: Initial Purge"
}

# --- PHASE 2: Brutal Verification Loop ---
Write-Host "[2/3] Verifying cleanup integrity..." -ForegroundColor Cyan
$retryCount = 0
$maxRetries = 3

while ($retryCount -lt $maxRetries) {
    $survivors = @(Get-ChildItem -Path . -Filter "node_modules" -Recurse -Directory -ErrorAction SilentlyContinue)
    
    if ($survivors.Count -eq 0) {
        Write-Host "Verification Passed: All node_modules purged." -ForegroundColor Green
        break
    }

    $retryCount++
    Write-Host "[!] ALERT: $($survivors.Count) folders survived! (Retry $retryCount/$maxRetries)" -ForegroundColor Red
    
    # Kill processes on first retry, or if folders keep surviving
    Stop-LockingProcesses
    
    # Brutal Recursive CMD delete on survivors
    Invoke-FastDelete -Paths ($survivors.FullName) -Label "Phase 2: Brutal Retry $retryCount"
}

# Final check after retries
if ((Get-ChildItem -Path . -Filter "node_modules" -Recurse -Directory -ErrorAction SilentlyContinue).Count -gt 0) {
    Write-Host "CRITICAL: Some folders are STILL locked by the OS. Manual intervention may be required." -ForegroundColor DarkRed
}

# --- PHASE 3: Handoff ---
$elapsed = (Get-Date) - $start
Write-Host "[3/3] Process finished in $($elapsed.TotalSeconds.ToString("F2"))s." -ForegroundColor Green

Write-Host "`nWould you like to trigger a fresh reinstallation? (Y/N)" -ForegroundColor Cyan -NoNewline
$key = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

if ($key.Character -eq 'y') {
    Write-Host "`nStarting Smart Install..." -ForegroundColor Green
    if (Test-Path ".\scripts\install.ps1") {
        & ".\scripts\install.ps1"
    } else {
        Write-Host "Error: .\scripts\install.ps1 not found!" -ForegroundColor Red
    }
} else {
    Write-Host "`nExiting." -ForegroundColor Gray
}