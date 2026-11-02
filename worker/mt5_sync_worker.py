"""
MT5 Sync Worker - Telemetría y Extracción Multi-Cuenta
Conecta con terminales locales de MetaTrader 5 y envía los snapshots diarios y deals cerrados
al servidor del HUD Portal.
"""

import sys
import time
import datetime
import json
import os
import requests

try:
    import MetaTrader5 as mt5
except ImportError:
    print("[ADVERTENCIA] El paquete MetaTrader5 no está instalado. Ejecuta: pip install MetaTrader5")
    mt5 = None

# Configuración del servidor Portal
API_BASE_URL = os.getenv("PORTAL_API_URL", "http://localhost:3000/api")
SYNC_INTERVAL_SECONDS = int(os.getenv("SYNC_INTERVAL", "10"))

# Lista de cuentas MT5 a monitorear (agrega tus credenciales o servidores)
ACCOUNTS_CONFIG = [
    {
        "account_id": 61602115,
        "name": "Valyrian Gold AntiToxic",
        "server": "MetaQuotes-Demo",  # Reemplazar con tu broker (ej. IC Markets, FTMO, Exness)
        "password": "",               # Opcional si el terminal ya tiene la sesión guardada
        "path": ""                    # Ruta opcional a terminal64.exe si hay múltiples terminales instalados
    }
]

def obtener_metricas_cuenta(account_info):
    """Extrae métricas en vivo y calcula el ROI del día actual"""
    hoy_inicio = datetime.datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
    hoy_fin = datetime.datetime.now()

    # Obtener historial de operaciones de hoy
    deals = mt5.history_deals_get(hoy_inicio, hoy_fin)
    pnl_hoy = 0.0
    trades_ganados = 0
    trades_perdidos = 0
    total_trades = 0

    if deals:
        for deal in deals:
            # Entry 1 = DEAL_ENTRY_OUT (cierre de operación)
            if deal.entry == 1:
                pnl_hoy += (deal.profit + deal.swap + deal.commission)
                total_trades += 1
                if deal.profit > 0:
                    trades_ganados += 1
                elif deal.profit < 0:
                    trades_perdidos += 1

    balance = account_info.balance
    equity = account_info.equity
    margin = account_info.margin
    free_margin = account_info.margin_free
    flotante = equity - balance

    # Balance inicial estimado al inicio de la jornada
    balance_inicio_dia = balance - pnl_hoy
    if balance_inicio_dia <= 0:
        balance_inicio_dia = balance

    roi_diario_pct = (pnl_hoy / balance_inicio_dia) * 100 if balance_inicio_dia > 0 else 0.0
    winrate_hoy = (trades_ganados / total_trades * 100) if total_trades > 0 else 0.0

    return {
        "login": account_info.login,
        "broker": account_info.company,
        "server": account_info.server,
        "currency": account_info.currency,
        "balance": round(balance, 2),
        "equity": round(equity, 2),
        "flotante": round(flotante, 2),
        "flotante_pct": round((flotante / balance) * 100 if balance > 0 else 0.0, 2),
        "margin": round(margin, 2),
        "free_margin": round(free_margin, 2),
        "pnl_hoy": round(pnl_hoy, 2),
        "roi_diario_pct": round(roi_diario_pct, 2),
        "trades_hoy": total_trades,
        "winrate_hoy": round(winrate_hoy, 1),
        "timestamp": datetime.datetime.now().isoformat()
    }

# Terminal MT5 específico para la cuenta 51567376
TERMINAL_PATH = r"C:\Program Files\MetaTrader 5\terminal64.exe"

def sincronizar():
    if not mt5:
        print("[ERROR] MetaTrader5 no disponible.")
        return

    # Inicializar MT5 apuntando al terminal de Pepperstone Live01
    init_ok = False
    if os.path.exists(TERMINAL_PATH):
        init_ok = mt5.initialize(path=TERMINAL_PATH)
    else:
        init_ok = mt5.initialize()

    if not init_ok:
        print(f"[ERROR] Error al inicializar MT5: {mt5.last_error()}")
        return

    info = mt5.account_info()
    print(f"=== [MT5 QUANT WORKER] Conectado exitosamente a Cuenta #{info.login} ({info.server}) ===")

    try:
        while True:
            account_info = mt5.account_info()
            if account_info is None:
                print(f"[ERROR] No se pudo obtener información de cuenta: {mt5.last_error()}")
            else:
                metricas = obtener_metricas_cuenta(account_info)
                print(f"[{datetime.datetime.now().strftime('%H:%M:%S')}] Cuenta {metricas['login']} | Balance: ${metricas['balance']} | Equity: ${metricas['equity']} | PnL Hoy: ${metricas['pnl_hoy']} ({metricas['roi_diario_pct']}%)")
                
                # Enviar payload al backend (si la API está encendida)
                try:
                    res = requests.post(f"{API_BASE_URL}/telemetry/snapshot", json=metricas, timeout=3)
                except Exception:
                    # En modo local/offline guarda en json local para el HUD
                    with open("../client/js/live_data.json", "w", encoding="utf-8") as f:
                        json.dump(metricas, f, indent=2)

            time.sleep(SYNC_INTERVAL_SECONDS)

    except KeyboardInterrupt:
        print("\n[INFO] Worker detenido por el usuario.")
    finally:
        mt5.shutdown()

if __name__ == "__main__":
    sincronizar()
