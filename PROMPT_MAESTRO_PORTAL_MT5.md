# 📊 PROMPT MAESTRO: PORTAL & HUD PROFESIONAL DE OPERATIVA MULTI-CUENTA MT5
> **Instrucciones:** Copia y pega el bloque dentro de las comillas triples en tu asistente de desarrollo (Claude, ChatGPT, Antigravity, Cursor o Gemini) para generar la arquitectura y el código completo del portal de trading.

```markdown
Actúa como un Ingeniero de Software Cuantitativo Senior y Arquitecto Full-Stack especializado en Sistemas Financieros, MetaTrader 5 (MT5 API/MQL5) y Plataformas de Monitoreo de Desempeño de Trading (estilo Myfxbook, TradeZella y Bloomberg Terminal).

Tu objetivo es diseñar y construir una plataforma web profesional completa: **"MT5 QUANT HUD & TRADING PORTAL"**, que permita centralizar, auditar y visualizar en tiempo real los resultados de múltiples cuentas y terminales de MetaTrader 5, con control de acceso por usuario y métricas estadísticas avanzadas (ROI diario, mensual acumulado, curvas de equidad y calendario térmico).

---

### 1. REQUERIMIENTOS CLAVE DEL SISTEMA

#### A. Autenticación y Control de Acceso Nativo
- **Registro de usuarios (Sign Up):** Formulario directo en el portal donde nuevos operadores pueden registrar su usuario, correo y contraseña.
- **Inicio de sesión (Login):** Autenticación segura mediante JSON Web Tokens (JWT) o cookies HttpOnly con contraseñas encriptadas con `bcrypt`.
- **Roles y Privilegios:**
  * `Admin / Master Trader`: Acceso total para dar de alta cuentas MT5, gestionar API Keys de conexión y ver el portafolio consolidado.
  * `Trader / Inversor`: Acceso de sólo lectura para auditar métricas de cuentas asignadas sin poder alterar configuraciones.
- **Protección de rutas:** Toda la vista del HUD debe estar protegida contra accesos no autenticados.

#### B. Sincronización y Conectividad Multi-Cuenta MT5
El portal debe ser capaz de recibir y procesar telemetría de múltiples cuentas MT5 simultáneamente mediante dos métodos compatibles:
1. **Worker/Daemon de Telemetría en Python (`MetaTrader5` SDK):** Script en segundo plano que corre en la máquina/VPS donde operan los terminales MT5, inicializa cada cuenta (`mt5.initialize(login=..., server=...)`), extrae periódicamente el balance, equity, margen, posiciones abiertas e historial de deals cerrados (`mt5.history_deals_get`), y los envía vía HTTP POST a la API del portal.
2. **Receptor Webhook / REST API:** Endpoints dedicados (`/api/v1/telemetry/snapshot` y `/api/v1/telemetry/trade-closed`) que validan un Token de cuenta antes de registrar la información en base de datos.

#### C. Motor de Analítica y Métricas Cuantitativas
El sistema debe calcular automáticamente:
1. **Rendimiento Diario (Daily ROI %):**
   $$\text{Daily ROI \%} = \left( \frac{\text{PnL Neto del Día}}{\text{Balance Inicial del Día}} \right) \times 100$$
2. **Rendimiento Mensual Acumulado (Cumulative Monthly Return %):**
   Calculado mediante retorno compuesto diario o relación entre el balance final del mes y el balance inicial del mes.
3. **Métricas Institucionales (KPIs):**
   - Balance actual vs Equity actual (Flotante en vivo).
   - Profit Factor ($\text{Ganancias brutas} / |\text{Pérdidas brutas}|$).
   - Win Rate % (Operaciones ganadoras / Total de operaciones).
   - Máximo Drawdown % histórico y diario (sobre Balance y sobre Equity).
   - Ratio Promedio Ganancia/Pérdida (Risk-Reward realizado).
   - Días consecutivos en ganancia vs pérdida.
4. **Selector Multi-Cuenta:**
   - Vista **"Master Portfolio (Consolidado)"**: Suma el balance y combina la curva de rendimiento de todas las cuentas activas.
   - Vista individual: Filtro por cuenta específica (ej: Cuenta Valyrian Gold #61602115, Cuenta FriasBot Scalper #2, etc.).

#### D. HUD y Experiencia de Usuario (UI/UX)
- **Estética Visual:** Interfaz estilo Terminal Cuantitativo / Hedge Fund Dark Mode.
  * Fondo: Carbón profundo (`#0b0f19` o `#0f172a`).
  * Ganancias / Positivo: Verde Esmeralda neón (`#10b981` / `#059669`).
  * Drawdown / Negativo: Rojo Carmesí neón (`#ef4444` / `#dc2626`).
  * Curva de Balance/Equity: Cian eléctrico (`#06b6d4`) y Violeta cuántico (`#8b5cf6`).
- **Componentes Gráficos Interactivos (usando Chart.js, ApexCharts o TradingView Lightweight Charts):**
  1. **Gráfica Principal de Crecimiento:** Curva de Balance vs Equity histórica en el tiempo con zoom temporal (1D, 1S, 1M, YTD, TODO).
  2. **Gráfica de Barras de ROI Diario (%):** Barras verdes y rojas indicando el porcentaje ganado o perdido cada día.
  3. **Calendario Térmico de Rendimiento (Performance Heatmap Calendar):**
     * Vista de calendario mensual donde cada casilla diaria muestra el día del mes, el resultado porcentual (ej. `+1.85%`, `-0.42%`, `+0.90%`) con código de color según la magnitud.
     * Columna lateral con el % acumulado del mes correspondiente.
  4. **Tabla de Posiciones Abiertas en Tiempo Real:** Ticket, Símbolo, Tipo (Buy/Sell), Lote, Precio de Entrada, Stop Loss, Take Profit, Flotante actual ($ y %).
  5. **Registro de Historial de Operaciones:** Con buscador por símbolo, fecha y filtro de trades ganadores/perdedores.

---

### 2. ARQUITECTURA TECNOLÓGICA RECOMENDADA
- **Backend:** Node.js (Express o Fastify) con TypeScript/JavaScript O Python (FastAPI).
- **Base de Datos:** SQLite (para despliegue local rápido sin configuración) o PostgreSQL / Supabase para producción.
- **Frontend:** Single Page Application moderna (React/Vite o HTML5 + Tailwind CSS + Vanilla/Alpine.js para cero dependencias pesadas).
- **Librería de Gráficos:** ApexCharts o Chart.js para el calendario y curvas interactivas.
- **Worker MT5:** Script Python modular con manejo de reconexiones automáticas a terminales MT5 locales.

---

### 3. ESTRUCTURA DE ARCHIVOS ESPERADA
```text
Portal_MT5_HUD/
├── .env.example                  # Variables de entorno (JWT_SECRET, PORT, DB_PATH)
├── .gitignore                    # Reglas de exclusión Git
├── README.md                     # Documentación de instalación y uso
├── server/                       # Backend API y Autenticación
│   ├── package.json              # O requirements.txt si es FastAPI
│   ├── server.js                 # Servidor API REST y WebSockets/SSE
│   ├── auth.js                   # Rutas de login, signup y verificación JWT
│   ├── database.js               # Conexión SQLite/PostgreSQL y esquemas de tablas
│   └── routes/
│       ├── telemetry.js          # Ingesta de snapshots y deals de MT5
│       └── analytics.js          # Cálculos de ROI diario, mensual y métricas
├── client/                       # Frontend HUD Portal
│   ├── index.html                # Interfaz principal del HUD (Dark Mode)
│   ├── login.html                # Portal de acceso y registro de usuarios
│   ├── css/
│   │   └── hud.css               # Estilos personalizados y paleta neón/trading
│   └── js/
│       ├── auth_client.js        # Manejo de tokens y sesiones
│       ├── hud_charts.js         # Gráficas de ApexCharts / Calendario térmico
│       └── hud_app.js            # Lógica reactiva de KPIs y filtros por cuenta
└── worker/                       # Conector con MetaTrader 5
    ├── mt5_sync_worker.py        # Colector Python que lee MT5 y envía al server
    └── requirements.txt          # MetaTrader5, requests, python-dotenv
```

---

### 4. ENTREGABLES ESPERADOS
Proporciona el código funcional completo, listo para ejecutarse y subirse a un repositorio de GitHub, incluyendo:
1. Esquema de base de datos con tablas para: `users`, `trading_accounts`, `daily_summaries`, `trades_history` y `equity_snapshots`.
2. Servidor backend con rutas completas de autenticación (signup/login) y endpoints de analítica de ROI diario y mensual.
3. El frontend del HUD con el Calendario Térmico de Rendimiento y gráficas de crecimiento interactivo.
4. El script en Python `mt5_sync_worker.py` con la lógica para conectarse a terminales MT5, extraer las operaciones del día y enviarlas a la base de datos.
5. Instrucciones paso a paso para inicializar Git y publicar el proyecto en GitHub.
```
