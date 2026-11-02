@echo off
title MT5 Live Auto-Sync Worker
echo =======================================================
echo [MT5 QUANT HUD] Conectando con MetaTrader 5 (En Vivo)...
echo Sincronizando balance, equity y operaciones...
echo =======================================================
cd /d "%~dp0worker"
python live_auto_sync.py
pause
