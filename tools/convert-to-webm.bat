@echo off
setlocal
title Chuyen doi Video sang WebM cho Spotify Wallpaper
cd /d "%~dp0"

if "%~1"=="" (
    echo ==========================================================
    echo  HUONG DAN SU DUNG:
    echo  Keo va tha (Drag and Drop) file video (.mp4, .mov, .mkv)
    echo  truc tiep vao file bat nay de convert sang dinh dang .webm
    echo ==========================================================
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

echo Dang chuyen doi: "%~1" sang WebM (VP8, 60fps/30fps, Full HD)...
echo Vui long cho trong giay lat...

%FFMPEG_CMD% -i "%~1" -vf "scale=1920:-2" -c:v libvpx -b:v 2.5M -crf 30 -quality realtime -cpu-used 8 -an -y "%~dpn1.webm"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ==========================================================
    echo  THANH CONG! File WebM da duoc tao tai:
    echo  "%~dpn1.webm"
    echo.
    echo  Bay gio ban co the chon file nay trong Spotify de chay mượt ma!
    echo ==========================================================
) else (
    echo.
    echo Co loi xay ra trong qua trinh chuyen doi.
)

pause
