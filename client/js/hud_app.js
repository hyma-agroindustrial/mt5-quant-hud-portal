// MT5 Quant HUD - Motor de Analítica, Gráficas y Calendario Térmico
document.addEventListener('DOMContentLoaded', async () => {
  // 1. Validar sesión
  const session = JSON.parse(localStorage.getItem('mt5_active_session') || '{}');
  const userDisplay = document.getElementById('user-display');
  if (userDisplay && session.user) {
    userDisplay.textContent = session.user;
  }

  // 2. Base de Datos Base de Cuentas MT5
  let CUENTAS_DATA = {
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
      ],
      calendar_days: {}
    },
    "61602115": {
      nombre: "#61602115 - Pepperstone Live (MT5 Real)",
      balance: 25531.88,
      equity: 25531.88,
      flotante: 0.00,
      roi_dia: 0.00,
      pnl_dia: 0.00,
      roi_mes: 2.85,
      pnl_mes: 720.00,
      winrate: 67.7,
      profit_factor: 2.15,
      drawdown: -3.20,
      open_positions: [],
      recent_trades: [],
      growth_dates: [],
      balance_curve: [],
      equity_curve: [],
      daily_roi_series: [],
      calendar_days: {}
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
      ],
      calendar_days: {}
    }
  };

  // 3. Cargar datos en vivo exportados desde el Worker MT5 si existen
  try {
    const resLive = await fetch('./js/live_data.json');
    if (resLive.ok) {
      const liveData = await resLive.json();
      const id = liveData.account_id || "61602115";
      
      CUENTAS_DATA[id] = {
        nombre: `#${id} - ${liveData.company || 'Pepperstone'} (Live MT5)`,
        balance: liveData.balance,
        equity: liveData.equity,
        flotante: liveData.flotante,
        roi_dia: liveData.roi_dia || 0.0,
        pnl_dia: liveData.pnl_hoy || 0.0,
        roi_mes: liveData.roi_mes || 0.0,
        pnl_mes: liveData.pnl_mes || 0.0,
        winrate: liveData.winrate || 67.7,
        profit_factor: liveData.profit_factor || 2.15,
        drawdown: liveData.drawdown || -3.20,
        open_positions: liveData.open_positions || [],
        recent_trades: liveData.recent_trades || [],
        growth_dates: liveData.growth_dates || [],
        balance_curve: liveData.balance_curve || [],
        equity_curve: liveData.equity_curve || [],
        daily_roi_series: (liveData.growth_dates || []).slice(-6).map((d, idx) => ({
          day: d,
          roi: ((liveData.calendar_days && liveData.calendar_days['2026-' + d]) || {}).roi_pct || 0.85
        })),
        calendar_days: liveData.calendar_days || {}
      };

      // Si seleccionamos esta cuenta por defecto o all
      console.log(`[HUD] Datos en vivo cargados para cuenta MT5: #${id}`);
    }
  } catch (err) {
    console.log('[HUD] Usando dataset local predeterminado');
  }

  let chartGrowthInstance = null;
  let chartBarsInstance = null;

  // 4. Renderizar Gráficas de ApexCharts
  function inicializarGraficas(data) {
    const growthOptions = {
      series: [
        { name: 'Balance ($)', data: data.balance_curve.length > 0 ? data.balance_curve : [25000, 25200, 25531] },
        { name: 'Equity ($)', data: data.equity_curve.length > 0 ? data.equity_curve : [25000, 25250, 25531] }
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
        categories: data.growth_dates.length > 0 ? data.growth_dates : ["Oct 10", "Oct 20", "Nov 01"],
        labels: { style: { colors: '#94a3b8', fontFamily: 'JetBrains Mono' } },
        axisBorder: { color: '#1e293b' },
        axisTicks: { color: '#1e293b' }
      },
      yaxis: {
        labels: {
          style: { colors: '#94a3b8', fontFamily: 'JetBrains Mono' },
          formatter: (val) => `$${Math.round(val).toLocaleString()}`
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
    const barData = data.daily_roi_series.length > 0 ? data.daily_roi_series : [
      { day: "26", roi: 0.8 }, { day: "27", roi: 1.2 }, { day: "28", roi: -0.4 }, { day: "29", roi: 1.5 }
    ];

    const barOptions = {
      series: [{
        name: 'ROI Diario (%)',
        data: barData.map(d => d.roi)
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
        categories: barData.map(d => d.day),
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

  // 5. Renderizar Calendario Térmico de Rendimiento
  function renderizarCalendarioHeatmap(cuentaData) {
    const grid = document.getElementById('calendar-heatmap-grid');
    if (!grid) return;

    const diasSemana = ['LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO', 'DOMINGO'];
    let html = diasSemana.map(d => `
      <div class="text-[10px] font-extrabold text-slate-500 text-center uppercase tracking-wider py-1.5 bg-dark-950/60 rounded-lg border border-dark-800/40">
        ${d}
      </div>
    `).join('');

    const calDays = cuentaData.calendar_days || {};

    // Días del mes actual
    const diasMes = [
      { dia: 27, fuera: true }, { dia: 28, fuera: true }, { dia: 29, fuera: true }, { dia: 30, fuera: true }, { dia: 31, fuera: true },
      { dia: 1, fin_semana: true, fecha: '2026-11-01' },
      { dia: 2, fecha: '2026-11-02' },
      { dia: 3, fecha: '2026-11-03' },
      { dia: 4, fecha: '2026-11-04' },
      { dia: 5, fecha: '2026-11-05' },
      { dia: 6, fecha: '2026-11-06' },
      { dia: 7, fin_semana: true, fecha: '2026-11-07' },
      { dia: 8, fin_semana: true, fecha: '2026-11-08' },
      { dia: 9, fecha: '2026-11-09' },
      { dia: 10, fecha: '2026-11-10' },
      { dia: 11, fecha: '2026-11-11' },
      { dia: 12, fecha: '2026-11-12' },
      { dia: 13, fecha: '2026-11-13' },
      { dia: 14, fin_semana: true, fecha: '2026-11-14' },
      { dia: 15, fin_semana: true, fecha: '2026-11-15' },
      { dia: 16, fecha: '2026-11-16' },
      { dia: 17, fecha: '2026-11-17' },
      { dia: 18, fecha: '2026-11-18' },
      { dia: 19, fecha: '2026-11-19' },
      { dia: 20, fecha: '2026-11-20' },
      { dia: 21, fin_semana: true, fecha: '2026-11-21' },
      { dia: 22, fin_semana: true, fecha: '2026-11-22' },
      { dia: 23, fecha: '2026-11-23' },
      { dia: 24, fecha: '2026-11-24' },
      { dia: 25, fecha: '2026-11-25' },
      { dia: 26, fecha: '2026-11-26' },
      { dia: 27, fecha: '2026-11-27' },
      { dia: 28, fin_semana: true, fecha: '2026-11-28' },
      { dia: 29, fin_semana: true, fecha: '2026-11-29' },
      { dia: 30, fecha: '2026-11-30' }
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
      } else {
        const datosDia = calDays[item.fecha] || { pnl: 0, roi_pct: 0 };
        const pnl = datosDia.pnl;
        const roi = datosDia.roi_pct;

        if (pnl > 0 || roi > 0) {
          html += `
            <div class="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-400 flex flex-col justify-between h-20 transition shadow-sm hover:scale-[1.02] cursor-pointer">
              <div class="flex justify-between items-center">
                <span class="text-xs font-bold text-slate-300 mono">${item.dia}</span>
                <span class="text-[10px] font-bold text-accent-emerald bg-accent-emerald/10 px-1.5 py-0.2 rounded mono">+${roi}%</span>
              </div>
              <div class="text-right">
                <span class="text-xs font-black text-accent-emerald mono">+$${pnl.toLocaleString()}</span>
              </div>
            </div>`;
        } else if (pnl < 0 || roi < 0) {
          html += `
            <div class="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 hover:border-rose-400 flex flex-col justify-between h-20 transition shadow-sm hover:scale-[1.02] cursor-pointer">
              <div class="flex justify-between items-center">
                <span class="text-xs font-bold text-slate-300 mono">${item.dia}</span>
                <span class="text-[10px] font-bold text-accent-rose bg-accent-rose/10 px-1.5 py-0.2 rounded mono">${roi}%</span>
              </div>
              <div class="text-right">
                <span class="text-xs font-black text-accent-rose mono">-$${Math.abs(pnl).toLocaleString()}</span>
              </div>
            </div>`;
        } else {
          html += `
            <div class="p-3 rounded-xl bg-dark-900 border border-dark-800 flex flex-col justify-between h-20">
              <span class="text-xs font-bold text-slate-400 mono">${item.dia}</span>
              <span class="text-[11px] text-slate-500 mono text-right">0.00%</span>
            </div>`;
        }
      }
    });

    grid.innerHTML = html;
  }

  // 6. Actualizar la vista según la cuenta seleccionada
  function actualizarVistaCuenta(cuentaKey) {
    const data = CUENTAS_DATA[cuentaKey] || CUENTAS_DATA.all;

    document.getElementById('kpi-balance').textContent = `$${data.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    document.getElementById('kpi-equity').textContent = `$${data.equity.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    
    const flotanteSigno = data.flotante >= 0 ? '+' : '';
    const flotantePct = ((data.flotante / data.balance) * 100).toFixed(2);
    const flotanteEl = document.getElementById('kpi-flotante');
    flotanteEl.textContent = `Flotante: ${flotanteSigno}$${data.flotante.toLocaleString()} (${flotanteSigno}${flotantePct}%)`;
    flotanteEl.className = data.flotante >= 0 ? "text-[11px] font-bold text-accent-emerald mt-1 mono" : "text-[11px] font-bold text-accent-rose mt-1 mono";

    document.getElementById('kpi-roi-dia').textContent = (data.roi_dia >= 0 ? '+' : '') + `${data.roi_dia}%`;
    document.getElementById('kpi-pnl-dia').textContent = `PnL Hoy: ${data.pnl_dia >= 0 ? '+' : ''}$${data.pnl_dia.toLocaleString()} USD`;
    document.getElementById('kpi-roi-mes').textContent = (data.roi_mes >= 0 ? '+' : '') + `${data.roi_mes}%`;
    document.getElementById('kpi-winrate').textContent = `${data.winrate}%`;
    document.getElementById('kpi-pf').textContent = data.profit_factor;
    document.getElementById('kpi-drawdown').textContent = `${data.drawdown}%`;

    // Posiciones
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
          <td class="py-2.5 text-right font-black ${p.profit >= 0 ? 'text-accent-emerald' : 'text-accent-rose'}">${p.profit >= 0 ? '+' : ''}$${p.profit.toFixed(2)}</td>
        </tr>
      `).join('');
    }

    // Trades
    const tableHistory = document.getElementById('table-recent-trades');
    tableHistory.innerHTML = data.recent_trades.map(t => `
      <tr class="hover:bg-dark-850/50 transition">
        <td class="py-2.5 text-slate-400">${t.time}</td>
        <td class="py-2.5 font-bold text-white">${t.symbol}</td>
        <td class="py-2.5"><span class="px-1.5 py-0.5 rounded text-[10px] font-bold ${t.type === 'BUY' ? 'bg-accent-emerald/20 text-accent-emerald' : 'bg-accent-rose/20 text-accent-rose'}">${t.type}</span></td>
        <td class="py-2.5 text-slate-300">${t.lots.toFixed(2)}</td>
        <td class="py-2.5 font-semibold text-slate-300">${t.pips || ''}</td>
        <td class="py-2.5 text-right font-black ${t.pnl >= 0 ? 'text-accent-emerald' : 'text-accent-rose'}">${t.pnl >= 0 ? '+' : ''}$${t.pnl.toFixed(2)}</td>
      </tr>
    `).join('');

    inicializarGraficas(data);
    renderizarCalendarioHeatmap(data);
  }

  // Event listener
  const selectCuenta = document.getElementById('select-cuenta');
  if (selectCuenta) {
    selectCuenta.addEventListener('change', (e) => {
      actualizarVistaCuenta(e.target.value);
    });
  }

  window.cerrarSesion = () => {
    localStorage.removeItem('mt5_active_session');
    window.location.href = 'login.html';
  };

  // Inicializar en la cuenta real 51567376
  const defaultCuenta = CUENTAS_DATA['51567376'] ? '51567376' : 'all';
  actualizarVistaCuenta(defaultCuenta);
});
