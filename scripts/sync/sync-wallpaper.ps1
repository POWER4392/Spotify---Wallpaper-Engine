try { $Host.UI.RawUI.WindowTitle = "Wallpaper Engine - Spotify Sync Bridge" } catch {}

$currentPid = $PID
Get-CimInstance Win32_Process -ErrorAction SilentlyContinue | Where-Object {
    $_.ProcessId -ne $currentPid -and $_.Name -match "powershell" -and $_.CommandLine -match "sync-wallpaper\.ps1" -and $_.CommandLine -notmatch "Get-CimInstance"
} | ForEach-Object {
    try { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue } catch {}
}

$projectRoot = (Get-Item "$PSScriptRoot\..\..").FullName
if (-not $projectRoot) { $projectRoot = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent }

$modulesDir = Join-Path $PSScriptRoot "modules"

Import-Module (Join-Path $modulesDir "WallpaperExtractors.psm1") -Force
Import-Module (Join-Path $modulesDir "WallpaperConfig.psm1") -Force
Import-Module (Join-Path $modulesDir "SyncHttpServer.psm1") -Force

Start-SyncHttpServer -Port 43196 -ProjectRoot $projectRoot
