@echo off
setlocal enabledelayedexpansion
title Convert Video to WebM for Spotify Wallpaper Engine
cd /d "%~dp0"

if "%~1"=="" (
    echo ==============================================================================
    echo  HIGH-QUALITY VIDEO CONVERTER FOR SPOTIFY WALLPAPER ENGINE
    echo  (100%% Open-Source, Supports 2K/4K, Preserves Native Aspect Ratio ^& Clarity)
    echo ==============================================================================
    echo.
    echo  PURPOSE:
    echo  Spotify (Chromium) plays WebM (VP9/VP8) with hardware acceleration,
    echo  providing ultra-smooth animated playback while minimizing CPU/GPU load.
    echo  This tool converts any video (.mp4, .mov, .mkv, .avi) to standard .webm,
    echo  preserving 60fps and native display resolution (1080p, 2K, 4K, 16:10, 16:9).
    echo.
    echo  HOW TO USE:
    echo  Drag and drop any video file directly onto this .bat file to convert!
    echo ==============================================================================
    echo.
    pause
    exit /b
)

set FFMPEG_CMD="%~dp0ffmpeg\ffmpeg.exe"
if not exist %FFMPEG_CMD% (
    where ffmpeg >nul 2>&1
    if %ERRORLEVEL% EQU 0 (
        set FFMPEG_CMD=ffmpeg
    ) else (
        echo [!] ffmpeg.exe was not found in tools\ffmpeg\ or your system PATH.
        echo Please ensure ffmpeg is available at tools\ffmpeg\ffmpeg.exe!
        pause
        exit /b
    )
)

echo.
echo ==============================================================================
echo  PROCESSING VIDEO: "%~nx1"
echo ==============================================================================
echo  Encoding to WebM VP9 (Preserving native resolution, GPU-optimized)...
echo  Please wait a moment...
echo.

%FFMPEG_CMD% -i "%~1" -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -c:v libvpx-vp9 -crf 24 -b:v 0 -row-mt 1 -threads 0 -quality good -cpu-used 2 -an -y "%~dpn1.webm"

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [*] Retrying with high-speed VP8 encoder fallback...
    %FFMPEG_CMD% -i "%~1" -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -c:v libvpx -b:v 4M -crf 26 -quality realtime -cpu-used 8 -threads 0 -an -y "%~dpn1.webm"
)

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ==============================================================================
    echo  [OK] SUCCESS! WebM video created at:
    echo  "%~dpn1.webm"
    echo.
    echo  Preserved native resolution and aspect ratio. You can now select this
    echo  file in Spotify Settings - Custom Video / File for vibrant live playback!
    echo ==============================================================================
) else (
    echo.
    echo [X] An error occurred during video conversion.
)

echo.
pause
