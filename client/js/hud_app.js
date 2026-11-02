// MT5 Quant HUD - Motor de Analítica, Gráficas y Calendario Térmico
document.addEventListener('DOMContentLoaded', () => {
  // 1. Validar sesión
  const session = JSON.parse(localStorage.getItem('mt5_active_session') || '{}');
  const userDisplay = document.getElementById('user-display');
  if (userDisplay && session.user) {
    userDisplay.textContent = session.user;
  }

  // 2. Base de Datos de Cuentas MT5 (Consolidado y Cuentas Individuales)
  const CUENTAS_DATA = {
    all: {
      nombre: "Portafolio Consolidado MT5",
      balance: 125480.50,
      equity: 126120.30,
      flotante: 639.80,
      roi_dia: 1.48,
      pnl_dia: 1842.20,
      roi_mes: 12.65,
      pnl_mes: 14280.00,
      winrate: 74.2,
      profit_factor: 2.18,
      drawdown: -4.32,
      open_positions: [
        { ticket: 9283711, symbol: "XAUUSD", type: "BUY", lots: 0.50, price: 2742.50, profit: 420.50 },
        { ticket: 9283745, symbol: "EURUSD", type: "SELL", lots: 1.00, price: 1.0820, profit: 219.30 }
      ],
      recent_trades: [
        { time: "16:42:10", symbol: "XAUUSD", type: "BUY", lots: 0.50, pips: "+38 pips", pnl: 650.00 },
        { time: "14:15:02", symbol: "US30", type: "SELL", lots: 0.20, pips: "+55 pts", pnl: 480.20 },
        { time: "11:08:44", symbol: "GBPUSD", type: "BUY", lots: 0.80, pips: "-12 pips", pnl: -180.00 },
        { time: "09:30:19", symbol: "XAUUSD", type: "SELL", lots: 0.40, pips: "+42 pips", pnl: 892.00 }
      ],
      growth_dates: ["Oct 01", "Oct 06", "Oct 12", "Oct 18", "Oct 24", "Oct 30", "Nov 01"],
      balance_curve: [100000, 103200, 107400, 112000, 118400, 123638, 125480],
      equity_curve: [100000, 103500, 107100, 112800, 118900, 124100, 126120],
      daily_roi_series: [
        { day: "L 26", roi: 0.85 },
        { day: "M 27", roi: 1.20 },
        { day: "X 28", roi: -0.45 },
        { day: "J 29", roi: 1.95 },
        { day: "V 30", roi: 0.60 },
        { day: "L 02", roi: 1.48 }
      ]
    },
    "61602115": {
      nombre: "#61602115 - Valyrian Gold AntiToxic",
      balance: 62450.00,
      equity: 62890.50,
      flotante: 440.50,
      roi_dia: 1.82,
      pnl_dia: 1120.00,
      roi_mes: 15.40,
      pnl_mes: 8340.00,
      winrate: 78.5,
      profit_factor: 2.65,
      drawdown: -3.80,
      open_positions: [
        { ticket: 9283711, symbol: "XAUUSD", type: "BUY", lots: 0.50, price: 2742.50, profit: 440.50 }
      ],
      recent_trades: [
        { time: "16:42:10", symbol: "XAUUSD", type: "BUY", lots: 0.50, pips: "+38 pips", pnl: 650.00 },
        { time: "09:30:19", symbol: "XAUUSD", type: "SELL", lots: 0.40, pips: "+42 pips", pnl: 470.00 }
      ],
      growth_dates: ["Oct 01", "Oct 06", "Oct 12", "Oct 18", "Oct 24", "Oct 30", "Nov 01"],
      balance_curve: [50000, 52100, 54500, 56800, 59200, 61330, 62450],
      equity_curve: [50000, 52400, 54200, 57100, 59500, 61700, 62890],
      daily_roi_series: [
        { day: "L 26", roi: 1.10 },
        { day: "M 27", roi: 1.45 },
        { day: "X 28", roi: -0.30 },
        { day: "J 29", roi: 2.10 },
        { day: "V 30", roi: 0.75 },
        { day: "L 02", roi: 1.82 }
      ]
    },
    "88492011": {
      nombre: "#88492011 - FriasBot Scalper Pro (FTMO)",
      balance: 45200.00,
      equity: 45399.30,
      flotante: 199.30,
      roi_dia: 1.15,
      pnl_dia: 522.20,
      roi_mes: 10.20,
      pnl_mes: 4200.00,
      winrate: 71.0,
      profit_factor: 1.95,
      drawdown: -4.10,
      open_positions: [
        { ticket: 9283745, symbol: "EURUSD", type: "SELL", lots: 1.00, price: 1.0820, profit: 199.30 }
      ],
      recent_trades: [
        { time: "14:15:02", symbol: "US30", type: "SELL", lots: 0.20, pips: "+55 pts", pnl: 480.20 },
        { time: "11:08:44", symbol: "GBPUSD", type: "BUY", lots: 0.80, pips: "-12 pips", pnl: -180.00 }
      ],
      growth_dates: ["Oct 01", "Oct 06", "Oct 12", "Oct 18", "Oct 24", "Oct 30", "Nov 01"],
      balance_curve: [40000, 41200, 42100, 43400, 44100, 44678, 45200],
      equity_curve: [40000, 41400, 41900, 43600, 44300, 44800, 45399],
      daily_roi_series: [
        { day: "L 26", roi: 0.60 },
        { day: "M 27", roi: 0.95 },
        { day: "X 28", roi: -0.60 },
        { day: "J 29", roi: 1.80 },
        { day: "V 30", roi: 0.45 },
        { day: "L 02", roi: 1.15 }
      ]
    },
    "10294822": {
      nombre: "#10294822 - Asia Session Dynamic Bot",
      balance: 17830.50,
      equity: 17830.50,
      flotante: 0.00,
      roi_dia: 1.12,
      pnl_dia: 200.00,
      roi_mes: 11.80,
      pnl_mes: 1740.00,
      winrate: 73.0,
      profit_factor: 2.05,
      drawdown: -3.50,
      open_positions: [],
      recent_trades: [
        { time: "05:12:00", symbol: "USDJPY", type: "BUY", lots: 0.30, pips: "+25 pips", pnl: 200.00 }
      ],
      growth_dates: ["Oct 01", "Oct 06", "Oct 12", "Oct 18", "Oct 24", "Oct 30", "Nov 01"],
      balance_curve: [15000, 15400, 15900, 16300, 16900, 17630, 17830],
      equity_curve: [15000, 15400, 15900, 16300, 16900, 17630, 17830],
      daily_roi_series: [
        { day: "L 26", roi: 0.90 },
        { day: "M 27", roi: 1.10 },
        { day: "X 28", roi: 0.00 },
        { day: "J 29", roi: 1.50 },
        { day: "V 30", roi: 0.80 },
        { day: "L 02", roi: 1.12 }
      ]
    }
  };

  let chartGrowthInstance = null;
  let chartBarsInstance = null;

  // 3. Renderizar Gráficas de ApexCharts
  function inicializarGraficas(data) {
    // A. Curva Balance vs Equity
    const growthOptions = {
      series: [
        { name: 'Balance ($)', data: data.balance_curve },
        { name: 'Equity ($)', data: data.equity_curve }
      ],
      chart: {
        type: 'area',
        height: 320,
        toolbar: { show: false },
        background: 'transparent'
      },
      colors: ['#06b6d4', '#10b981'],
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.35,
          opacityTo: 0.05,
          stops: [0, 95, 100]
        }
      },
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth', width: 2.5 },
      xaxis: {
        categories: data.growth_dates,
        labels: { style: { colors: '#94a3b8', fontFamily: 'JetBrains Mono' } },
        axisBorder: { color: '#1e293b' },
        axisTicks: { color: '#1e293b' }
      },
      yaxis: {
        labels: {
          style: { colors: '#94a3b8', fontFamily: 'JetBrains Mono' },
          formatter: (val) => `$${val.toLocaleString()}`
        }
      },
      grid: { borderColor: '#1e293b', strokeDashArray: 4 },
      tooltip: { theme: 'dark' },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        labels: { colors: '#e2e8f0' },
        fontFamily: 'Plus Jakarta Sans'
      }
    };

    if (chartGrowthInstance) chartGrowthInstance.destroy();
    chartGrowthInstance = new ApexCharts(document.getElementById('chart-growth'), growthOptions);
    chartGrowthInstance.render();

    // B. Retorno Diario en %
    const barOptions = {
      series: [{
        name: 'ROI Diario (%)',
        data: data.daily_roi_series.map(d => d.roi)
      }],
      chart: {
        type: 'bar',
        height: 320,
        toolbar: { show: false },
        background: 'transparent'
      },
      plotOptions: {
        bar: {
          colors: {
            ranges: [
              { from: -100, to: 0, color: '#f43f5e' },
              { from: 0.0001, to: 100, color: '#10b981' }
            ]
          },
          borderRadius: 6,
          columnWidth: '55%'
        }
      },
      dataLabels: {
        enabled: true,
        formatter: (val) => (val >= 0 ? `+${val}%` : `${val}%`),
        offsetY: -20,
        style: { fontSize: '10px', colors: ['#f8fafc'], fontFamily: 'JetBrains Mono' }
      },
      xaxis: {
        categories: data.daily_roi_series.map(d => d.day),
        labels: { style: { colors: '#94a3b8', fontFamily: 'JetBrains Mono' } },
        axisBorder: { color: '#1e293b' }
      },
      yaxis: {
        labels: {
          style: { colors: '#94a3b8', fontFamily: 'JetBrains Mono' },
          formatter: (val) => `${val}%`
        }
      },
      grid: { borderColor: '#1e293b', strokeDashArray: 4 },
      tooltip: { theme: 'dark' }
    };

    if (chartBarsInstance) chartBarsInstance.destroy();
    chartBarsInstance = new ApexCharts(document.getElementById('chart-daily-bars'), barOptions);
    chartBarsInstance.render();
  }

  // 4. Renderizar Calendario Térmico de Rendimiento (Estilo Myfxbook/TradeZella)
  function renderizarCalendarioHeatmap() {
    const grid = document.getElementById('calendar-heatmap-grid');
    if (!grid) return;

    // Encabezados de días
    const diasSemana = ['LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO', 'DOMINGO'];
    let html = diasSemana.map(d => `
      <div class="text-[10px] font-extrabold text-slate-500 text-center uppercase tracking-wider py-1.5 bg-dark-950/60 rounded-lg border border-dark-800/40">
        ${d}
      </div>
    `).join('');

    // Datos simulados de los días del mes (Noviembre)
    const diasMes = [
      { dia: 27, fuera: true, roi: 0, pnl: 0 },
      { dia: 28, fuera: true, roi: 0, pnl: 0 },
      { dia: 29, fuera: true, roi: 0, pnl: 0 },
      { dia: 30, fuera: true, roi: 0, pnl: 0 },
      { dia: 31, fuera: true, roi: 0, pnl: 0 },
      { dia: 1, roi: 0, pnl: 0, fin_semana: true },
      { dia: 2, roi: 1.48, pnl: 1842.20 },
      { dia: 3, roi: 1.15, pnl: 1430.50 },
      { dia: 4, roi: -0.42, pnl: -520.00 },
      { dia: 5, roi: 2.10, pnl: 2640.00 },
      { dia: 6, roi: 0.95, pnl: 1190.00 },
      { dia: 7, roi: 0, pnl: 0, fin_semana: true },
      { dia: 8, roi: 0, pnl: 0, fin_semana: true },
      { dia: 9, roi: 1.30, pnl: 1650.00 },
      { dia: 10, roi: 1.85, pnl: 2340.00 },
      { dia: 11, roi: 0.40, pnl: 510.00 },
      { dia: 12, roi: -0.75, pnl: -950.00 },
      { dia: 13, roi: 1.60, pnl: 2050.00 },
      { dia: 14, roi: 0, pnl: 0, fin_semana: true },
      { dia: 15, roi: 0, pnl: 0, fin_semana: true },
      { dia: 16, roi: 0.85, pnl: 1100.00 },
      { dia: 17, roi: 1.40, pnl: 1810.00 },
      { dia: 18, roi: 2.25, pnl: 2940.00 },
      { dia: 19, roi: 0.90, pnl: 1180.00 },
      { dia: 20, roi: 1.10, pnl: 1450.00 },
      { dia: 21, roi: 0, pnl: 0, fin_semana: true },
      { dia: 22, roi: 0, pnl: 0, fin_semana: true },
      { dia: 23, roi: 1.70, pnl: 2240.00 },
      { dia: 24, roi: -0.30, pnl: -400.00 },
      { dia: 25, roi: 1.25, pnl: 1680.00 },
      { dia: 26, roi: 0.80, pnl: 1080.00 },
      { dia: 27, roi: 1.05, pnl: 1420.00 },
      { dia: 28, roi: 0, pnl: 0, fin_semana: true },
      { dia: 29, roi: 0, pnl: 0, fin_semana: true },
      { dia: 30, roi: 1.48, pnl: 2010.00 }
    ];

    diasMes.forEach(item => {
      if (item.fuera) {
        html += `<div class="p-3 rounded-xl bg-dark-950/30 border border-dark-800/20 opacity-30 text-slate-600 font-mono text-xs">${item.dia}</div>`;
      } else if (item.fin_semana) {
        html += `
          <div class="p-3 rounded-xl bg-dark-950/40 border border-dark-800/30 flex flex-col justify-between h-20 opacity-50">
            <span class="text-xs font-bold text-slate-500 mono">${item.dia}</span>
            <span class="text-[10px] text-slate-600 font-semibold uppercase">Cierre</span>
          </div>`;
      } else if (item.roi > 0) {
        html += `
          <div class="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-400 flex flex-col justify-between h-20 transition shadow-sm hover:scale-[1.02] cursor-pointer">
            <div class="flex justify-between items-center">
              <span class="text-xs font-bold text-slate-300 mono">${item.dia}</span>
              <span class="text-[10px] font-bold text-accent-emerald bg-accent-emerald/10 px-1.5 py-0.2 rounded mono">+${item.roi}%</span>
            </div>
            <div class="text-right">
              <span class="text-xs font-black text-accent-emerald mono">+$${item.pnl.toLocaleString()}</span>
            </div>
          </div>`;
      } else if (item.roi < 0) {
        html += `
          <div class="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 hover:border-rose-400 flex flex-col justify-between h-20 transition shadow-sm hover:scale-[1.02] cursor-pointer">
            <div class="flex justify-between items-center">
              <span class="text-xs font-bold text-slate-300 mono">${item.dia}</span>
              <span class="text-[10px] font-bold text-accent-rose bg-accent-rose/10 px-1.5 py-0.2 rounded mono">${item.roi}%</span>
            </div>
            <div class="text-right">
              <span class="text-xs font-black text-accent-rose mono">-$${Math.abs(item.pnl).toLocaleString()}</span>
            </div>
          </div>`;
      } else {
        html += `
          <div class="p-3 rounded-xl bg-dark-900 border border-dark-800 flex flex-col justify-between h-20">
            <span class="text-xs font-bold text-slate-400 mono">${item.dia}</span>
            <span class="text-[11px] text-slate-500 mono text-right">0.00%</span>
          </div>`;
      }
    });

    grid.innerHTML = html;
  }

  // 5. Actualizar la vista según la cuenta seleccionada
  function actualizarVistaCuenta(cuentaKey) {
    const data = CUENTAS_DATA[cuentaKey] || CUENTAS_DATA.all;

    // Actualizar KPIs de texto
    document.getElementById('kpi-balance').textContent = `$${data.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    document.getElementById('kpi-equity').textContent = `$${data.equity.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    
    const flotanteSigno = data.flotante >= 0 ? '+' : '';
    const flotantePct = ((data.flotante / data.balance) * 100).toFixed(2);
    const flotanteEl = document.getElementById('kpi-flotante');
    flotanteEl.textContent = `Flotante: ${flotanteSigno}$${data.flotante.toLocaleString()} (${flotanteSigno}${flotantePct}%)`;
    flotanteEl.className = data.flotante >= 0 ? "text-[11px] font-bold text-accent-emerald mt-1 mono" : "text-[11px] font-bold text-accent-rose mt-1 mono";

    document.getElementById('kpi-roi-dia').textContent = `+${data.roi_dia}%`;
    document.getElementById('kpi-pnl-dia').textContent = `PnL Hoy: +$${data.pnl_dia.toLocaleString()} USD`;
    document.getElementById('kpi-roi-mes').textContent = `+${data.roi_mes}%`;
    document.getElementById('kpi-winrate').textContent = `${data.winrate}%`;
    document.getElementById('kpi-pf').textContent = data.profit_factor;
    document.getElementById('kpi-drawdown').textContent = `${data.drawdown}%`;

    // Tabla Posiciones Abiertas
    const tableOpen = document.getElementById('table-open-positions');
    const badgeOpenCount = document.getElementById('badge-open-count');
    badgeOpenCount.textContent = `${data.open_positions.length} Activas`;
    
    if (data.open_positions.length === 0) {
      tableOpen.innerHTML = `<tr><td colspan="6" class="py-6 text-center text-slate-500 italic">No hay posiciones abiertas en este momento</td></tr>`;
    } else {
      tableOpen.innerHTML = data.open_positions.map(p => `
        <tr class="hover:bg-dark-850/50 transition">
          <td class="py-2.5 text-slate-400">#${p.ticket}</td>
          <td class="py-2.5 font-bold text-white">${p.symbol}</td>
          <td class="py-2.5"><span class="px-1.5 py-0.5 rounded text-[10px] font-bold ${p.type === 'BUY' ? 'bg-accent-emerald/20 text-accent-emerald' : 'bg-accent-rose/20 text-accent-rose'}">${p.type}</span></td>
          <td class="py-2.5 text-slate-300">${p.lots.toFixed(2)}</td>
          <td class="py-2.5 text-slate-300">${p.price}</td>
          <td class="py-2.5 text-right font-black ${p.profit >= 0 ? 'text-accent-emerald' : 'text-accent-rose'}">+$${p.profit.toFixed(2)}</td>
        </tr>
      `).join('');
    }

    // Tabla Historial de Trades
    const tableHistory = document.getElementById('table-recent-trades');
    tableHistory.innerHTML = data.recent_trades.map(t => `
      <tr class="hover:bg-dark-850/50 transition">
        <td class="py-2.5 text-slate-400">${t.time}</td>
        <td class="py-2.5 font-bold text-white">${t.symbol}</td>
        <td class="py-2.5"><span class="px-1.5 py-0.5 rounded text-[10px] font-bold ${t.type === 'BUY' ? 'bg-accent-emerald/20 text-accent-emerald' : 'bg-accent-rose/20 text-accent-rose'}">${t.type}</span></td>
        <td class="py-2.5 text-slate-300">${t.lots.toFixed(2)}</td>
        <td class="py-2.5 font-semibold text-slate-300">${t.pips}</td>
        <td class="py-2.5 text-right font-black ${t.pnl >= 0 ? 'text-accent-emerald' : 'text-accent-rose'}">${t.pnl >= 0 ? '+' : ''}$${t.pnl.toFixed(2)}</td>
      </tr>
    `).join('');

    // Actualizar Gráficas
    inicializarGraficas(data);
  }

  // Event listener para cambio de cuenta
  const selectCuenta = document.getElementById('select-cuenta');
  if (selectCuenta) {
    selectCuenta.addEventListener('change', (e) => {
      actualizarVistaCuenta(e.target.value);
    });
  }

  // Funciones globales
  window.cerrarSesion = () => {
    localStorage.removeItem('mt5_active_session');
    window.location.href = 'login.html';
  };

  window.cambiarPeriodo = (periodo) => {
    console.log(`Periodo cambiado a: ${periodo}`);
    // Simulación de zoom de temporalidad
  };

  // Inicializar vista con la cuenta consolidada
  actualizarVistaCuenta('all');
  renderizarCalendarioHeatmap();
});
