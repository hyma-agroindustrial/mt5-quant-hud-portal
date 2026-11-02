@echo off
title MT5 Quant HUD Portal
echo =======================================================
echo [MT5 QUANT HUD] Iniciando Servidor y Base de Datos...
echo =======================================================
cd /d "%~dp0server"
start http://localhost:3000/login.html
node server.js
pause
