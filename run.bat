@echo off
title Startup CRM
cd /d "%~dp0"
echo ===================================================
echo           Starting Startup CRM Application
echo ===================================================
echo.
echo Starting Backend (Port 5000) and Frontend (Port 5173)...
echo.
start http://localhost:5173
npm run dev:full
pause
