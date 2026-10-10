@echo off
if "%~1"=="--silent" goto :silent
if "%~1"=="/silent" goto :silent
if "%~1"=="-s" goto :silent
goto :normal

:silent
start "" wscript.exe "%~dp0scripts\sync\start-sync-silent.vbs"
exit /b

:normal
chcp 65001 >nul
title Wallpaper Engine - Spotify Sync Bridge
echo ============================================================
echo   Wallpaper Engine -^> Spotify Sync Bridge
echo ============================================================
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\sync\sync-wallpaper.ps1"
pause
