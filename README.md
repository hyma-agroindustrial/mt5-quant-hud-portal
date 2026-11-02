# ⚡ MT5 Quant HUD & Performance Trading Portal

Terminal y portal web cuantitativo para centralizar, auditar y monitorear operativas multi-cuenta de MetaTrader 5 en tiempo real.

---

## 🌟 Características Principales

1. **Autenticación Nativa en el Portal:**
   - Registro de operadores y login directo desde `client/login.html`.
   - Control de sesiones seguro.

2. **Auditoría Multi-Cuenta MT5:**
   - Selector en tiempo real para auditar el **Portafolio Consolidado** o aislar una cuenta específica (ej. Valyrian Gold, FTMO, etc.).

3. **Métricas Diarias y Mensuales:**
   - **ROI Diario de Hoy (%)**: Porcentaje ganado o perdido en la sesión actual.
   - **ROI Mensual Acumulado (%)**: Retorno acumulado en el mes.
   - **Calendario Térmico de Rendimiento (Performance Heatmap Grid)** estilo Myfxbook/TradeZella, con casillas de cada día del mes coloreadas en verde/rojo con su porcentaje exacto.
   - **Curva de Crecimiento de Balance vs Equity** (ApexCharts interactivo).

4. **Telemetría en Vivo de MT5:**
   - Script en segundo plano `worker/mt5_sync_worker.py` que lee automáticamente el balance, equidad, margen, flotante y operaciones cerradas de tus terminales MT5.

---

## 🚀 Inicio Rápido

### 1. Ver el Portal en tu Navegador
Solo haz doble clic en `client/login.html` o `client/index.html` para abrir el HUD en cualquier navegador.

### 2. Conectar el Worker de MT5 (Opcional)
Para sincronizar en tiempo real con terminales locales:
```powershell
cd worker
pip install -r requirements.txt
python mt5_sync_worker.py
```
