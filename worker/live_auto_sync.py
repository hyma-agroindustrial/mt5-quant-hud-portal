KNOWN_SL_TP = {
    301769082: {'sl': '', 'tp': '3906.46'},
    301808161: {'sl': '', 'tp': '3920.79'},
    301808162: {'sl': '', 'tp': '3920.94'},
    301808163: {'sl': '', 'tp': '3920.85'},
    301808164: {'sl': '', 'tp': '3912.56'},
    301812246: {'sl': '', 'tp': '3906.08'},
    301830494: {'sl': '3912.62', 'tp': '3914.96'},
    301830725: {'sl': '3912.62', 'tp': '3914.96'},
    301836124: {'sl': '3912.93', 'tp': ''},
}

"""
MT5 Live Auto-Sync Daemon (Resiliente y Continuo)
Monitorea continuamente la terminal MT5 (cuenta 51567376 en Pepperstone Live01),
detecta cambios en balance, equity, flotante y operaciones en tiempo real,
actualiza client/js/live_data.json y client/js/hud_app.js,
y sincroniza automáticamente con GitHub Pages.
"""

import sys
import os
import time
import json
import datetime
import subprocess
from collections import defaultdict

try:
    import MetaTrader5 as mt5
except ImportError:
    print("[ERROR] MetaTrader5 no instalado en Python.", flush=True)
    sys.exit(1)

TERMINAL_PATH = r"C:\Program Files\MetaTrader 5\terminal64.exe"
TARGET_LOGIN = 51567376
CLIENT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "client"))
JSON_PATH = os.path.join(CLIENT_DIR, "js", "live_data.json")
JS_PATH = os.path.join(CLIENT_DIR, "js", "hud_app.js")
REPO_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
GIT_PATH = r"C:\Program Files\Git\cmd\git.exe"

last_saved_deals = None
last_saved_balance = None
last_pushed_deals = None
last_pushed_balance = None
last_git_push = 0
pending_push = False

def extraer_telemetria_completa():
    acc = mt5.account_info()
    if not acc:
        return None

    balance = float(acc.balance)
    equity = float(acc.equity)
    flotante = round(equity - balance, 2)

    utc = datetime.timezone.utc
    deals = mt5.history_deals_get(datetime.datetime(2024, 1, 1, tzinfo=utc), datetime.datetime.now(utc) + datetime.timedelta(days=1))
    if deals is None:
        deals = []

    all_deals_list = []
    daily_gross = defaultdict(float)
    daily_comm = defaultdict(float)
    daily_swap = defaultdict(float)
    daily_net = defaultdict(float)
    daily_trades = defaultdict(int)
    daily_wins = defaultdict(int)
    daily_losses = defaultdict(int)

    monthly_net = defaultdict(float)
    calendar_by_month = defaultdict(dict)

    orders = mt5.history_orders_get(datetime.datetime(2024, 1, 1, tzinfo=utc), datetime.datetime.now(utc) + datetime.timedelta(days=1))
    order_sl = {}
    order_tp = {}
    pos_sl = {}
    pos_tp = {}
    if orders:
        for o in orders:
            if o.sl > 0:
                order_sl[o.ticket] = o.sl
                pos_sl[o.position_id] = o.sl
            if o.tp > 0:
                order_tp[o.ticket] = o.tp
                pos_tp[o.position_id] = o.tp

    closed_deals = [d for d in deals if d.entry == 1]
    total_closed = len(closed_deals)
    total_wins = 0

    for d in deals:
        dt = datetime.datetime.fromtimestamp(d.time, utc)
        day_str = dt.strftime('%Y-%m-%d')
        month_str = dt.strftime('%Y-%m')
        time_str = dt.strftime('%Y.%m.%d %H:%M:%S')

        deal_net = round(d.profit + d.commission + d.swap, 2)
        daily_gross[day_str] += d.profit
        daily_comm[day_str] += d.commission
        daily_swap[day_str] += d.swap
        daily_net[day_str] += deal_net

        if d.entry == 1:
            daily_trades[day_str] += 1
            if deal_net > 0:
                daily_wins[day_str] += 1
                total_wins += 1
            else:
                daily_losses[day_str] += 1

        t_type = 'buy' if d.type == 0 else 'sell'
        direction = 'in' if d.entry == 0 else ('out' if d.entry == 1 else 'in/out')

        # Known SL / TP mapping
        known = KNOWN_SL_TP.get(d.ticket)
        if known:
            sl_val = known['sl']
            tp_val = known['tp']
        else:
            sl_num = order_sl.get(d.order, 0.0) or pos_sl.get(d.position_id, 0.0)
            tp_num = order_tp.get(d.order, 0.0) or pos_tp.get(d.position_id, 0.0)
            sl_val = f"{sl_num:.2f}" if sl_num > 0 else ""
            tp_val = f"{tp_num:.2f}" if tp_num > 0 else ""

        all_deals_list.append({
            'ticket': d.ticket,
            'time': time_str,
            'date': day_str,
            'month': month_str,
            'symbol': d.symbol.upper(),
            'type': t_type,
            'direction': direction,
            'volume': round(d.volume, 2),
            'price': round(d.price, 2),
            'sl': sl_val,
            'tp': tp_val,
            'commission': round(d.commission, 2),
            'profit': round(d.profit, 2),
            'net': deal_net
        })

    all_deals_list.reverse()

    for day_str in sorted(daily_net.keys()):
        month_str = day_str[:7]
        monthly_net[month_str] += daily_net[day_str]

    sorted_days = sorted(daily_net.keys())
    running_bal = balance - sum(daily_net.values())
    growth_dates = []
    balance_curve = []
    equity_curve = []

    for day_str in sorted_days:
        running_bal += daily_net[day_str]
        growth_dates.append(day_str)
        balance_curve.append(round(running_bal, 2))
        equity_curve.append(round(running_bal + (flotante if day_str == sorted_days[-1] else 0.0), 2))

    for day_str in sorted_days:
        month_str = day_str[:7]
        pnl = round(daily_net[day_str], 2)
        gross = round(daily_gross[day_str], 2)
        comm = round(daily_comm[day_str], 2)
        trades = daily_trades[day_str]
        wins = daily_wins[day_str]
        losses = daily_losses[day_str]

        idx = growth_dates.index(day_str)
        start_bal = balance_curve[idx-1] if idx > 0 else (balance_curve[0] - pnl)
        if start_bal <= 0:
            start_bal = balance
        roi_pct = round((pnl / start_bal) * 100, 2)

        calendar_by_month[month_str][day_str] = {
            'pnl': pnl,
            'gross': gross,
            'commission': comm,
            'roi_pct': roi_pct,
            'trades': trades,
            'wins': wins,
            'losses': losses
        }

    winrate = round((total_wins / total_closed * 100), 1) if total_closed > 0 else 0.0

    return {
        'account_id': str(acc.login),
        'account_name': f'{acc.login} - pepperstoneBS-MT5',
        'server': acc.server,
        'company': acc.company,
        'balance': balance,
        'equity': equity,
        'flotante': flotante,
        'winrate': winrate,
        'total_trades': total_closed,
        'total_wins': total_wins,
        'growth_dates': growth_dates,
        'balance_curve': balance_curve,
        'equity_curve': equity_curve,
        'daily_net': {k: round(v, 2) for k, v in daily_net.items()},
        'daily_gross': {k: round(v, 2) for k, v in daily_gross.items()},
        'daily_comm': {k: round(v, 2) for k, v in daily_comm.items()},
        'monthly_net': {k: round(v, 2) for k, v in monthly_net.items()},
        'calendar_by_month': calendar_by_month,
        'all_deals': all_deals_list,
        'total_deals_raw': len(deals),
        'last_updated': datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }

def guardar_telemetria(data):
    with open(JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)

    try:
        with open(JS_PATH, 'r', encoding='utf-8') as f:
            js_text = f.read()

        start_idx = js_text.find('const MT5_DATA = ')
        end_idx = js_text.find('let chartGrowth = null;')
        if start_idx != -1 and end_idx != -1:
            json_str = json.dumps(data, indent=2)
            new_js = js_text[:start_idx] + 'const MT5_DATA = ' + json_str + ';\n\n  ' + js_text[end_idx:]
            with open(JS_PATH, 'w', encoding='utf-8') as f:
                f.write(new_js)
    except Exception as e:
        print(f"[WARN] Error actualizando hud_app.js: {e}", flush=True)

def intentar_subir_a_github(cur_bal, cur_deals):
    global last_git_push, pending_push, last_pushed_deals, last_pushed_balance
    if not os.path.exists(GIT_PATH):
        return

    now = time.time()
    # Esperar al menos 15 segundos entre pushes para no sobrecargar git
    if now - last_git_push < 15:
        pending_push = True
        return

    try:
        subprocess.run([GIT_PATH, "add", "client/js/live_data.json", "client/js/hud_app.js"], cwd=REPO_DIR, capture_output=True)
        subprocess.run([GIT_PATH, "commit", "-m", f"live: MT5 sync bal=${cur_bal:.2f} deals={cur_deals} ({datetime.datetime.now().strftime('%H:%M:%S')})"], cwd=REPO_DIR, capture_output=True)
        res = subprocess.run([GIT_PATH, "push", "origin", "main"], cwd=REPO_DIR, capture_output=True, text=True, timeout=20)
        if res.returncode == 0:
            print(f"[{datetime.datetime.now().strftime('%H:%M:%S')}] [GITHUB PUSH OK] Balance: ${cur_bal:.2f} | Deals: {cur_deals} subidos a la nube.", flush=True)
            last_git_push = now
            last_pushed_deals = cur_deals
            last_pushed_balance = cur_bal
            pending_push = False
        else:
            print(f"[{datetime.datetime.now().strftime('%H:%M:%S')}] [GITHUB PUSH PENDIENTE] Error en push: {res.stderr[:80]}", flush=True)
    except Exception as e:
        print(f"[WARN] Excepción en push: {e}", flush=True)

def ciclo_monitoreo():
    global last_saved_balance, last_saved_deals, pending_push
    print("=" * 65, flush=True)
    print("  MT5 LIVE AUTO-SYNC WORKER - CUENTA 51567376", flush=True)
    print("  Monitoreando terminal MT5 cada 3 segundos...", flush=True)
    print("=" * 65, flush=True)

    if not mt5.initialize(TERMINAL_PATH):
        print(f"[ERROR] No se pudo conectar a MT5 en: {TERMINAL_PATH}", flush=True)
        return

    info = mt5.account_info()
    print(f"[CONECTADO] Cuenta: {info.login} ({info.server}) | Balance: ${info.balance:.2f} | Equity: ${info.equity:.2f}", flush=True)

    try:
        while True:
            data = extraer_telemetria_completa()
            if data:
                cur_bal = data['balance']
                cur_deals = data['total_deals_raw']
                cur_equity = data['equity']
                cur_flotante = data['flotante']

                cambio_balance = (last_saved_balance != cur_bal)
                cambio_deals = (last_saved_deals != cur_deals)

                # Siempre guardar en disco local para que el portal local/navegador lo lea al instante
                guardar_telemetria(data)

                if cambio_balance or cambio_deals:
                    print(f"[{datetime.datetime.now().strftime('%H:%M:%S')}] NUEVO TRADE/BALANCE DETECTADO:", flush=True)
                    print(f"   Balance: ${cur_bal:.2f} | Equity: ${cur_equity:.2f} | Flotante: ${cur_flotante:.2f} | Deals: {cur_deals}", flush=True)
                    last_saved_balance = cur_bal
                    last_saved_deals = cur_deals
                    pending_push = True

                # Si hay push pendiente (por nuevo trade o porque pasaron 15s)
                if pending_push or (cur_deals != last_pushed_deals) or (cur_bal != last_pushed_balance):
                    intentar_subir_a_github(cur_bal, cur_deals)

            time.sleep(3)
    except KeyboardInterrupt:
        print("\n[INFO] Worker detenido por el usuario.", flush=True)
    finally:
        mt5.shutdown()

if __name__ == '__main__':
    ciclo_monitoreo()
