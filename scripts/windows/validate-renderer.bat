@echo off
cd /d "%~dp0..\.."
node scripts/validate-render-daily-brief.mjs
pause
