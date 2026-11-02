@echo off
title MT5 Telemetry Worker
echo =======================================================
echo [MT5 QUANT WORKER] Conectando con MetaTrader 5...
echo =======================================================
cd /d "%~dp0worker"
python mt5_sync_worker.py
pause
