function Get-ShellThumbPath {
    param([string]$projectRoot)
    $candidates = @(
        (Join-Path $projectRoot "tools\shellthumb\ShellThumb.exe"),
        (Join-Path $env:TEMP "shellthumb\ShellThumb.exe")
    )
    foreach ($c in $candidates) {
        if ($c -and (Test-Path $c)) { return $c }
    }
    return $null
}

function Get-RePkgPath {
    param([string]$projectRoot)
    $candidates = @(
        (Join-Path $projectRoot "tools\repkg\RePKG.exe"),
        (Join-Path $env:TEMP "repkg\RePKG.exe")
    )
    foreach ($c in $candidates) {
        if ($c -and (Test-Path $c)) { return $c }
    }
    return $null
}

function Extract-VideoWallpaper {
    param(
        [string]$videoPath,
        [string]$projectRoot
    )
    if (-not (Test-Path $videoPath)) { return $null }

    $folder = Split-Path $videoPath
    $workshopId = Split-Path $folder -Leaf
    if (-not $workshopId -or $workshopId -eq "") { $workshopId = "default" }

    $cacheRoot = Join-Path $env:TEMP "we_cache"
    $cacheDir  = Join-Path $cacheRoot $workshopId
    if (-not (Test-Path $cacheDir)) {
        New-Item -ItemType Directory -Path $cacheDir -Force | Out-Null
    }

    $outPng = Join-Path $cacheDir "video_frame.png"
    if (Test-Path $outPng) { return $outPng }

    $shellThumb = Get-ShellThumbPath -projectRoot $projectRoot
    if ($shellThumb) {
        try {
            $pinfo = New-Object System.Diagnostics.ProcessStartInfo
            $pinfo.FileName = $shellThumb
            $pinfo.Arguments = "`"$videoPath`" `"$outPng`""
            $pinfo.UseShellExecute = $false
            $pinfo.CreateNoWindow = $true
            $proc = [System.Diagnostics.Process]::Start($pinfo)
            $proc.WaitForExit(5000) | Out-Null
            if (Test-Path $outPng) {
                Write-Host " [VideoFrame] Extracted Full HD frame from: $workshopId" -ForegroundColor Cyan
                return $outPng
            }
        } catch {}
    }

    $prev = Join-Path $folder "preview.gif"
    if (Test-Path $prev) { return $prev }
    $prevImg = Join-Path $folder "preview.jpg"
    if (Test-Path $prevImg) { return $prevImg }

    return $null
}

function Extract-SceneWallpaper {
    param(
        [string]$pkgPath,
        [string]$projectRoot
    )
    if (-not (Test-Path $pkgPath)) { return $null }

    $folder = Split-Path $pkgPath
    $workshopId = Split-Path $folder -Leaf
    if (-not $workshopId -or $workshopId -eq "") { $workshopId = "default" }

    $cacheRoot = Join-Path $env:TEMP "we_cache"
    $cacheDir  = Join-Path $cacheRoot $workshopId
    if (-not (Test-Path $cacheDir)) {
        New-Item -ItemType Directory -Path $cacheDir -Force | Out-Null
    }

    $resolvedJpg = Join-Path $cacheDir "resolved_wallpaper.jpg"
    if ((Test-Path $resolvedJpg) -and ((Get-Item $resolvedJpg).Length -gt 10000)) {
        return $resolvedJpg
    }

    $hasFiles = Get-ChildItem -Path $cacheDir -File -ErrorAction SilentlyContinue | Where-Object { $_.Name -ne "resolved_wallpaper.jpg" }
    if (-not $hasFiles) {
        $repkg = Get-RePkgPath -projectRoot $projectRoot
        if ($repkg) {
            Write-Host " [RePKG] Extracting full background from: $workshopId..." -ForegroundColor Cyan
            try {
                $pinfo = New-Object System.Diagnostics.ProcessStartInfo
                $pinfo.FileName = $repkg
                $pinfo.Arguments = "extract `"$pkgPath`" -o `"$cacheDir`" -s --onlyexts tex,json,mp4,webm"
                $pinfo.UseShellExecute = $false
                $pinfo.CreateNoWindow = $true
                $pinfo.RedirectStandardOutput = $true
                $pinfo.RedirectStandardError = $true

                $proc = [System.Diagnostics.Process]::Start($pinfo)
                $proc.WaitForExit(30000) | Out-Null
            } catch {
                Write-Warning "RePKG error: $($_.Exception.Message)"
            }
        }
    }

    $compScript = Join-Path $projectRoot "tools\compositor\compose_scene.py"
    if (Test-Path $compScript) {
        try {
            $pyCmd = (Get-Command 'py', 'python' -ErrorAction SilentlyContinue | Where-Object { $_.Source -notmatch 'WindowsApps' } | Select-Object -First 1).Source
            if (-not $pyCmd) { $pyCmd = "python" }

            $pinfo = New-Object System.Diagnostics.ProcessStartInfo
            $pinfo.FileName = $pyCmd
            $pinfo.Arguments = "`"$compScript`" `"$cacheDir`""
            $pinfo.UseShellExecute = $false
            $pinfo.CreateNoWindow = $true
            $proc = [System.Diagnostics.Process]::Start($pinfo)
            $proc.WaitForExit(30000) | Out-Null
            if ((Test-Path $resolvedJpg) -and ((Get-Item $resolvedJpg).Length -gt 10000)) {
                Write-Host " [Compositor] Ready complete background: $workshopId" -ForegroundColor Green
                return $resolvedJpg
            }
        } catch {}
    }

    $prev = Join-Path $folder "preview.gif"
    if (Test-Path $prev) { return $prev }
    $prevImg = Join-Path $folder "preview.jpg"
    if (Test-Path $prevImg) { return $prevImg }

    return $null
}

Export-ModuleMember -Function Get-ShellThumbPath, Get-RePkgPath, Extract-VideoWallpaper, Extract-SceneWallpaper
