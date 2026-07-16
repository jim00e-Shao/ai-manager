@echo off
cd /d "%~dp0..\.."
node scripts/render-daily-brief.mjs
pause
