function Get-WallpaperEngineConfigPath {
    $proc = Get-Process -Name "wallpaper64", "wallpaper32" -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($proc -and $proc.Path) {
        $dir = Split-Path $proc.Path
        $cfg = Join-Path $dir "config.json"
        if (Test-Path $cfg) { return $cfg }
    }

    try {
        $steamPath = (Get-ItemProperty -Path "HKCU:\Software\Valve\Steam" -Name "SteamPath" -ErrorAction SilentlyContinue).SteamPath
        if ($steamPath) {
            $cfg = Join-Path $steamPath "steamapps\common\wallpaper_engine\config.json"
            if (Test-Path $cfg) { return $cfg }
        }
    } catch {}

    $drives = Get-PSDrive -PSProvider FileSystem -ErrorAction SilentlyContinue | Select-Object -ExpandProperty Root
    foreach ($d in $drives) {
        $candidates = @(
            (Join-Path $d "SteamLibrary\steamapps\common\wallpaper_engine\config.json"),
            (Join-Path $d "Program Files (x86)\Steam\steamapps\common\wallpaper_engine\config.json"),
            (Join-Path $d "Program Files\Steam\steamapps\common\wallpaper_engine\config.json"),
            (Join-Path $d "Steam\steamapps\common\wallpaper_engine\config.json"),
            (Join-Path $d "Games\steamapps\common\wallpaper_engine\config.json"),
            (Join-Path $d "App\steamapps\common\wallpaper_engine\config.json")
        )
        foreach ($p in $candidates) {
            if (Test-Path $p) { return $p }
        }
    }
    return $null
}

function Get-CurrentWallpaperInfo {
    param([string]$projectRoot)
    $configPath = Get-WallpaperEngineConfigPath
    if (-not $configPath) { return $null }

    try {
        $raw  = Get-Content $configPath -Raw -Encoding UTF8 -ErrorAction Stop
        $json = $raw | ConvertFrom-Json

        $userProps = $json.PSObject.Properties | Where-Object { $_.Name -notin @("?installdirectory", "general") }
        if (-not $userProps) { return $null }
        $userObj = $userProps[0].Value

        $wpConfig = $userObj.general.wallpaperconfig
        if (-not $wpConfig) { return $null }

        $monitor0 = $wpConfig.selectedwallpapers.Monitor0
        if (-not $monitor0 -or -not $monitor0.file) {
            $monitor0 = $wpConfig.selectedwallpapers.Monitor1
        }
        if (-not $monitor0 -or -not $monitor0.file) { return $null }

        $filePath = $monitor0.file
        $folder   = Split-Path $filePath

        $title    = "Wallpaper Engine"
        $projFile = Join-Path $folder "project.json"
        if (Test-Path $projFile) {
            try {
                $proj = Get-Content $projFile -Raw -Encoding UTF8 | ConvertFrom-Json
                if ($proj.title) { $title = $proj.title }
            } catch {}
        }

        $targetMedia = $null
        $mediaType   = "image/jpeg"
        $directExt   = [System.IO.Path]::GetExtension($filePath).ToLower()

        if ((Test-Path $filePath) -and ($directExt -eq ".webm")) {
            $targetMedia = $filePath
            $mediaType   = "video/webm"
        }
        elseif ((Test-Path $filePath) -and ($directExt -eq ".mp4")) {
            $frame = Extract-VideoWallpaper -videoPath $filePath -projectRoot $projectRoot
            if ($frame) {
                $targetMedia = $frame
                $ext = [System.IO.Path]::GetExtension($targetMedia).ToLower()
                if ($ext -eq ".png") { $mediaType = "image/png" }
                elseif ($ext -eq ".gif") { $mediaType = "image/gif" }
                elseif ($ext -eq ".webp") { $mediaType = "image/webp" }
                else { $mediaType = "image/jpeg" }
            }
        }

        if (-not $targetMedia -and (Test-Path $filePath) -and ($directExt -in @(".jpg", ".jpeg", ".png", ".gif", ".webp"))) {
            $targetMedia = $filePath
            switch ($directExt) {
                ".png"  { $mediaType = "image/png" }
                ".gif"  { $mediaType = "image/gif" }
                ".webp" { $mediaType = "image/webp" }
                default { $mediaType = "image/jpeg" }
            }
        }

        if (-not $targetMedia -and $directExt -eq ".pkg") {
            $extracted = Extract-SceneWallpaper -pkgPath $filePath -projectRoot $projectRoot
            if ($extracted) {
                $targetMedia = $extracted
                $ext = [System.IO.Path]::GetExtension($targetMedia).ToLower()
                if ($ext -eq ".png") { $mediaType = "image/png" }
                elseif ($ext -eq ".webp") { $mediaType = "image/webp" }
                else { $mediaType = "image/jpeg" }
            }
        }

        if (-not $targetMedia) {
            $webmVid = Get-ChildItem -Path $folder -Filter "*.webm" -ErrorAction SilentlyContinue | Select-Object -First 1
            if ($webmVid) {
                $targetMedia = $webmVid.FullName
                $mediaType   = "video/webm"
            } else {
                $vids = Get-ChildItem -Path $folder -Filter "*.mp4" -ErrorAction SilentlyContinue | Sort-Object Length -Descending
                if ($vids) {
                    $frame = Extract-VideoWallpaper -videoPath $vids[0].FullName -projectRoot $projectRoot
                    if ($frame) {
                        $targetMedia = $frame
                        $ext = [System.IO.Path]::GetExtension($targetMedia).ToLower()
                        if ($ext -eq ".png") { $mediaType = "image/png" }
                        elseif ($ext -eq ".gif") { $mediaType = "image/gif" }
                        else { $mediaType = "image/jpeg" }
                    }
                }
            }
            if (-not $targetMedia) {
                $imgs = Get-ChildItem -Path $folder -Include "*.jpg","*.jpeg","*.png","*.webp","*.gif" -ErrorAction SilentlyContinue | Sort-Object Length -Descending
                if ($imgs) {
                    $best = $imgs | Where-Object { $_.BaseName -match "(?i)^(bg|background|image|wallpaper|scene|main|full|cover)" } | Select-Object -First 1
                    if (-not $best) { $best = $imgs | Where-Object { $_.BaseName -notmatch "(?i)preview" -and $_.Length -gt 200KB } | Select-Object -First 1 }
                    if (-not $best) { $best = $imgs | Select-Object -First 1 }
                    $targetMedia = $best.FullName
                    $ext = $best.Extension.ToLower()
                    if ($ext -eq ".png") { $mediaType = "image/png" }
                    elseif ($ext -eq ".gif") { $mediaType = "image/gif" }
                    elseif ($ext -eq ".webp") { $mediaType = "image/webp" }
                    else { $mediaType = "image/jpeg" }
                }
            }
        }

        if (-not $targetMedia) { return $null }

        $workshopId = Split-Path $folder -Leaf
        if (-not $workshopId -or $workshopId -eq "") { $workshopId = "default" }

        return @{
            Id        = $workshopId
            Title     = $title
            Path      = $targetMedia
            FileName  = "${workshopId}_$([System.IO.Path]::GetFileName($targetMedia))"
            MediaType = $mediaType
            Folder    = $folder
        }
    } catch {
        return $null
    }
}

Export-ModuleMember -Function Get-WallpaperEngineConfigPath, Get-CurrentWallpaperInfo
