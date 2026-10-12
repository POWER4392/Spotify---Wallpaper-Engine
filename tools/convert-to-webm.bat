@echo off
setlocal enabledelayedexpansion
title Chuyen doi Video sang WebM cho Spotify Wallpaper
cd /d "%~dp0"

if "%~1"=="" (
    echo ==============================================================================
    echo  CONG CU CONVERT VIDEO CHAT LUONG CAO CHO SPOTIFY WALLPAPER ENGINE
    echo  (100%% Open-Source, Ho tro 2K/4K, Giu nguyen ti le man hinh va do net goc)
    echo ==============================================================================
    echo.
    echo  MUC DICH:
    echo  Spotify (Chromium) phat WebM (VP9/VP8) muot nhat va tiet kiem GPU/CPU nhat.
    echo  Cong cu nay chuyen doi tu moi dinh dang (.mp4, .mov, .mkv, .avi) sang .webm
    echo  chuan, dong thoi giu nguyen 60fps va do phan giai goc (1080p, 2K, 4K, 16:10, 16:9).
    echo.
    echo  HUONG DAN SU DUNG:
    echo  Keo va tha (Drag ^& Drop) file video truc tiep vao file .bat nay de convert!
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
        echo [!] Khong tim thay ffmpeg.exe trong tools\ffmpeg\ hoac tren he thong.
        echo Vui long tai ffmpeg ve dat tai tools\ffmpeg\ffmpeg.exe de su dung!
        pause
        exit /b
    )
)

echo.
echo ==============================================================================
echo  DANG XU LY VIDEO: "%~nx1"
echo ==============================================================================
echo  Dang ma hoa sang WebM VP9 (Giu nguyen do phan giai goc, Toi uu GPU Spotify)...
echo  Vui long cho trong giay lat...
echo.

%FFMPEG_CMD% -i "%~1" -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -c:v libvpx-vp9 -crf 24 -b:v 0 -row-mt 1 -threads 0 -quality good -cpu-used 2 -an -y "%~dpn1.webm"

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [*] Thu lai voi bo ma hoa VP8 toc do cao...
    %FFMPEG_CMD% -i "%~1" -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -c:v libvpx -b:v 4M -crf 26 -quality realtime -cpu-used 8 -threads 0 -an -y "%~dpn1.webm"
)

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ==============================================================================
    echo  [OK] THANH CONG! File WebM da duoc tao tai:
    echo  "%~dpn1.webm"
    echo.
    echo  Giu nguyen ti le man hinh va do net goc. Ban co the chon file nay
    echo  trong Spotify Settings - Custom Video / File de hien thi tuyet dep!
    echo ==============================================================================
) else (
    echo.
    echo [X] Co loi xay ra trong qua trinh chuyen doi.
)

echo.
pause
