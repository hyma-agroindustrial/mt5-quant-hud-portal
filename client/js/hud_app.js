// MT5 Quant HUD - Motor de Analítica, Gráficas y Calendario Térmico
document.addEventListener('DOMContentLoaded', () => {
  // 1. Validar sesión
  const session = JSON.parse(localStorage.getItem('mt5_active_session') || '{}');
  const userDisplay = document.getElementById('user-display');
  if (userDisplay && session.user) {
    userDisplay.textContent = session.user;
  }

  // 2. Base de Datos con Telemetría Real de MetaTrader 5 (Cuenta #51567376)
  const CUENTAS_DATA = {
    "51567376": {
  "account_id": "51567376",
  "account_name": "#51567376 - PepperstoneBS-MT5-Live01 (Valyrian Gold)",
  "server": "PepperstoneBS-MT5-Live01",
  "company": "Pepperstone Markets Limited",
  "balance": 3970.21,
  "equity": 3970.21,
  "flotante": 0.0,
  "margin": 0.0,
  "free_margin": 3970.21,
  "pnl_hoy": 43.84,
  "roi_dia": 1.12,
  "pnl_mes": 43.84,
  "roi_mes": 1.12,
  "winrate": 71.6,
  "profit_factor": 2.45,
  "drawdown": -2.8,
  "total_trades": 493,
  "open_positions": [],
  "recent_trades": [
    {
      "ticket": 301812246,
      "time": "23:03:28",
      "date": "2026-11-01",
      "symbol": "XAUUSD",
      "type": "SELL",
      "lots": 0.01,
      "pips": "N/A",
      "pnl": 3.68
    },
    {
      "ticket": 301808164,
      "time": "22:40:21",
      "date": "2026-11-01",
      "symbol": "XAUUSD",
      "type": "SELL",
      "lots": 0.05,
      "pips": "N/A",
      "pnl": 29.47
    },
    {
      "ticket": 301808163,
      "time": "22:40:21",
      "date": "2026-11-01",
      "symbol": "XAUUSD",
      "type": "SELL",
      "lots": 0.02,
      "pips": "N/A",
      "pnl": 15.35
    },
    {
      "ticket": 301808162,
      "time": "22:40:21",
      "date": "2026-11-01",
      "symbol": "XAUUSD",
      "type": "SELL",
      "lots": 0.02,
      "pips": "N/A",
      "pnl": -3.45
    },
    {
      "ticket": 301808161,
      "time": "22:40:21",
      "date": "2026-11-01",
      "symbol": "XAUUSD",
      "type": "SELL",
      "lots": 0.02,
      "pips": "N/A",
      "pnl": -10.75
    },
    {
      "ticket": 301769082,
      "time": "20:08:58",
      "date": "2026-11-01",
      "symbol": "XAUUSD",
      "type": "SELL",
      "lots": 0.01,
      "pips": "N/A",
      "pnl": 9.54
    },
    {
      "ticket": 301338749,
      "time": "01:25:48",
      "date": "2026-10-30",
      "symbol": "XAUUSD",
      "type": "SELL",
      "lots": 0.01,
      "pips": "N/A",
      "pnl": 8.02
    },
    {
      "ticket": 301338748,
      "time": "01:25:48",
      "date": "2026-10-30",
      "symbol": "XAUUSD",
      "type": "SELL",
      "lots": 0.01,
      "pips": "N/A",
      "pnl": -4.98
    },
    {
      "ticket": 301338747,
      "time": "01:25:48",
      "date": "2026-10-30",
      "symbol": "XAUUSD",
      "type": "SELL",
      "lots": 0.01,
      "pips": "N/A",
      "pnl": 3.5
    },
    {
      "ticket": 301289551,
      "time": "21:59:19",
      "date": "2026-10-29",
      "symbol": "XAUUSD",
      "type": "SELL",
      "lots": 0.01,
      "pips": "N/A",
      "pnl": 3.0
    },
    {
      "ticket": 301281754,
      "time": "21:35:26",
      "date": "2026-10-29",
      "symbol": "XAUUSD",
      "type": "SELL",
      "lots": 0.1,
      "pips": "N/A",
      "pnl": 4.85
    },
    {
      "ticket": 301281572,
      "time": "21:34:53",
      "date": "2026-10-29",
      "symbol": "XAUUSD",
      "type": "SELL",
      "lots": 0.03,
      "pips": "N/A",
      "pnl": 1.96
    },
    {
      "ticket": 301279507,
      "time": "21:29:34",
      "date": "2026-10-29",
      "symbol": "XAUUSD",
      "type": "SELL",
      "lots": 0.02,
      "pips": "N/A",
      "pnl": 24.33
    },
    {
      "ticket": 301278573,
      "time": "21:27:35",
      "date": "2026-10-29",
      "symbol": "XAUUSD",
      "type": "SELL",
      "lots": 0.02,
      "pips": "N/A",
      "pnl": 3.57
    },
    {
      "ticket": 301275087,
      "time": "21:19:52",
      "date": "2026-10-29",
      "symbol": "XAUUSD",
      "type": "SELL",
      "lots": 0.05,
      "pips": "N/A",
      "pnl": 5.72
    }
  ],
  "growth_dates": [
    "10-04",
    "10-05",
    "10-06",
    "10-07",
    "10-08",
    "10-09",
    "10-11",
    "10-12",
    "10-13",
    "10-14",
    "10-15",
    "10-16",
    "10-18",
    "10-19",
    "10-20",
    "10-22",
    "10-25",
    "10-26",
    "10-27",
    "10-28",
    "10-29",
    "10-30",
    "11-01"
  ],
  "balance_curve": [
    3836.83,
    3719.87,
    3747.72,
    3693.36,
    3907.99,
    3941.06,
    3942.33,
    3013.17,
    3011.46,
    3055.67,
    3287.46,
    3291.14,
    3273.72,
    3381.41,
    3493.8,
    3519.76,
    3549.02,
    3579.04,
    3683.66,
    3686.01,
    3919.83,
    3926.37,
    3970.21
  ],
  "equity_curve": [
    3836.83,
    3719.87,
    3747.72,
    3693.36,
    3907.99,
    3941.06,
    3942.33,
    3013.17,
    3011.46,
    3055.67,
    3287.46,
    3291.14,
    3273.72,
    3381.41,
    3493.8,
    3519.76,
    3549.02,
    3579.04,
    3683.66,
    3686.01,
    3919.83,
    3926.37,
    3970.21
  ],
  "calendar_days": {
    "2026-10-04": {
      "pnl": 12.83,
      "roi_pct": 0.34,
      "trades": 7,
      "wins": 6
    },
    "2026-10-05": {
      "pnl": -116.96,
      "roi_pct": -3.05,
      "trades": 101,
      "wins": 62
    },
    "2026-10-06": {
      "pnl": 27.85,
      "roi_pct": 0.75,
      "trades": 32,
      "wins": 26
    },
    "2026-10-07": {
      "pnl": -54.36,
      "roi_pct": -1.45,
      "trades": 28,
      "wins": 16
    },
    "2026-10-08": {
      "pnl": 214.63,
      "roi_pct": 5.81,
      "trades": 23,
      "wins": 22
    },
    "2026-10-09": {
      "pnl": 33.07,
      "roi_pct": 0.85,
      "trades": 9,
      "wins": 7
    },
    "2026-10-11": {
      "pnl": 1.27,
      "roi_pct": 0.03,
      "trades": 16,
      "wins": 12
    },
    "2026-10-12": {
      "pnl": -929.16,
      "roi_pct": -23.57,
      "trades": 27,
      "wins": 10
    },
    "2026-10-13": {
      "pnl": -1.71,
      "roi_pct": -0.06,
      "trades": 50,
      "wins": 38
    },
    "2026-10-14": {
      "pnl": 44.21,
      "roi_pct": 1.47,
      "trades": 46,
      "wins": 36
    },
    "2026-10-15": {
      "pnl": 231.79,
      "roi_pct": 7.59,
      "trades": 23,
      "wins": 18
    },
    "2026-10-16": {
      "pnl": 3.68,
      "roi_pct": 0.11,
      "trades": 4,
      "wins": 2
    },
    "2026-10-18": {
      "pnl": -17.42,
      "roi_pct": -0.53,
      "trades": 9,
      "wins": 5
    },
    "2026-10-19": {
      "pnl": 107.69,
      "roi_pct": 3.29,
      "trades": 21,
      "wins": 17
    },
    "2026-10-20": {
      "pnl": 112.39,
      "roi_pct": 3.32,
      "trades": 27,
      "wins": 21
    },
    "2026-10-22": {
      "pnl": 25.96,
      "roi_pct": 0.74,
      "trades": 10,
      "wins": 7
    },
    "2026-10-25": {
      "pnl": 29.26,
      "roi_pct": 0.83,
      "trades": 4,
      "wins": 3
    },
    "2026-10-26": {
      "pnl": 30.02,
      "roi_pct": 0.85,
      "trades": 7,
      "wins": 4
    },
    "2026-10-27": {
      "pnl": 104.62,
      "roi_pct": 2.92,
      "trades": 5,
      "wins": 5
    },
    "2026-10-28": {
      "pnl": 2.35,
      "roi_pct": 0.06,
      "trades": 1,
      "wins": 1
    },
    "2026-10-29": {
      "pnl": 233.82,
      "roi_pct": 6.34,
      "trades": 34,
      "wins": 29
    },
    "2026-10-30": {
      "pnl": 6.54,
      "roi_pct": 0.17,
      "trades": 3,
      "wins": 2
    },
    "2026-11-01": {
      "pnl": 43.84,
      "roi_pct": 1.12,
      "trades": 6,
      "wins": 4
    }
  },
  "timestamp": "2026-11-01T23:15:21.989700"
},
    "all": {
  "account_id": "51567376",
  "account_name": "#51567376 - PepperstoneBS-MT5-Live01 (Valyrian Gold)",
  "server": "PepperstoneBS-MT5-Live01",
  "company": "Pepperstone Markets Limited",
  "balance": 3970.21,
  "equity": 3970.21,
  "flotante": 0.0,
  "margin": 0.0,
  "free_margin": 3970.21,
  "pnl_hoy": 43.84,
  "roi_dia": 1.12,
  "pnl_mes": 43.84,
  "roi_mes": 1.12,
  "winrate": 71.6,
  "profit_factor": 2.45,
  "drawdown": -2.8,
  "total_trades": 493,
  "open_positions": [],
  "recent_trades": [
    {
      "ticket": 301812246,
      "time": "23:03:28",
      "date": "2026-11-01",
      "symbol": "XAUUSD",
      "type": "SELL",
      "lots": 0.01,
      "pips": "N/A",
      "pnl": 3.68
    },
    {
      "ticket": 301808164,
      "time": "22:40:21",
      "date": "2026-11-01",
      "symbol": "XAUUSD",
      "type": "SELL",
      "lots": 0.05,
      "pips": "N/A",
      "pnl": 29.47
    },
    {
      "ticket": 301808163,
      "time": "22:40:21",
      "date": "2026-11-01",
      "symbol": "XAUUSD",
      "type": "SELL",
      "lots": 0.02,
      "pips": "N/A",
      "pnl": 15.35
    },
    {
      "ticket": 301808162,
      "time": "22:40:21",
      "date": "2026-11-01",
      "symbol": "XAUUSD",
      "type": "SELL",
      "lots": 0.02,
      "pips": "N/A",
      "pnl": -3.45
    },
    {
      "ticket": 301808161,
      "time": "22:40:21",
      "date": "2026-11-01",
      "symbol": "XAUUSD",
      "type": "SELL",
      "lots": 0.02,
      "pips": "N/A",
      "pnl": -10.75
    },
    {
      "ticket": 301769082,
      "time": "20:08:58",
      "date": "2026-11-01",
      "symbol": "XAUUSD",
      "type": "SELL",
      "lots": 0.01,
      "pips": "N/A",
      "pnl": 9.54
    },
    {
      "ticket": 301338749,
      "time": "01:25:48",
      "date": "2026-10-30",
      "symbol": "XAUUSD",
      "type": "SELL",
      "lots": 0.01,
      "pips": "N/A",
      "pnl": 8.02
    },
    {
      "ticket": 301338748,
      "time": "01:25:48",
      "date": "2026-10-30",
      "symbol": "XAUUSD",
      "type": "SELL",
      "lots": 0.01,
      "pips": "N/A",
      "pnl": -4.98
    },
    {
      "ticket": 301338747,
      "time": "01:25:48",
      "date": "2026-10-30",
      "symbol": "XAUUSD",
      "type": "SELL",
      "lots": 0.01,
      "pips": "N/A",
      "pnl": 3.5
    },
    {
      "ticket": 301289551,
      "time": "21:59:19",
      "date": "2026-10-29",
      "symbol": "XAUUSD",
      "type": "SELL",
      "lots": 0.01,
      "pips": "N/A",
      "pnl": 3.0
    },
    {
      "ticket": 301281754,
      "time": "21:35:26",
      "date": "2026-10-29",
      "symbol": "XAUUSD",
      "type": "SELL",
      "lots": 0.1,
      "pips": "N/A",
      "pnl": 4.85
    },
    {
      "ticket": 301281572,
      "time": "21:34:53",
      "date": "2026-10-29",
      "symbol": "XAUUSD",
      "type": "SELL",
      "lots": 0.03,
      "pips": "N/A",
      "pnl": 1.96
    },
    {
      "ticket": 301279507,
      "time": "21:29:34",
      "date": "2026-10-29",
      "symbol": "XAUUSD",
      "type": "SELL",
      "lots": 0.02,
      "pips": "N/A",
      "pnl": 24.33
    },
    {
      "ticket": 301278573,
      "time": "21:27:35",
      "date": "2026-10-29",
      "symbol": "XAUUSD",
      "type": "SELL",
      "lots": 0.02,
      "pips": "N/A",
      "pnl": 3.57
    },
    {
      "ticket": 301275087,
      "time": "21:19:52",
      "date": "2026-10-29",
      "symbol": "XAUUSD",
      "type": "SELL",
      "lots": 0.05,
      "pips": "N/A",
      "pnl": 5.72
    }
  ],
  "growth_dates": [
    "10-04",
    "10-05",
    "10-06",
    "10-07",
    "10-08",
    "10-09",
    "10-11",
    "10-12",
    "10-13",
    "10-14",
    "10-15",
    "10-16",
    "10-18",
    "10-19",
    "10-20",
    "10-22",
    "10-25",
    "10-26",
    "10-27",
    "10-28",
    "10-29",
    "10-30",
    "11-01"
  ],
  "balance_curve": [
    3836.83,
    3719.87,
    3747.72,
    3693.36,
    3907.99,
    3941.06,
    3942.33,
    3013.17,
    3011.46,
    3055.67,
    3287.46,
    3291.14,
    3273.72,
    3381.41,
    3493.8,
    3519.76,
    3549.02,
    3579.04,
    3683.66,
    3686.01,
    3919.83,
    3926.37,
    3970.21
  ],
  "equity_curve": [
    3836.83,
    3719.87,
    3747.72,
    3693.36,
    3907.99,
    3941.06,
    3942.33,
    3013.17,
    3011.46,
    3055.67,
    3287.46,
    3291.14,
    3273.72,
    3381.41,
    3493.8,
    3519.76,
    3549.02,
    3579.04,
    3683.66,
    3686.01,
    3919.83,
    3926.37,
    3970.21
  ],
  "calendar_days": {
    "2026-10-04": {
      "pnl": 12.83,
      "roi_pct": 0.34,
      "trades": 7,
      "wins": 6
    },
    "2026-10-05": {
      "pnl": -116.96,
      "roi_pct": -3.05,
      "trades": 101,
      "wins": 62
    },
    "2026-10-06": {
      "pnl": 27.85,
      "roi_pct": 0.75,
      "trades": 32,
      "wins": 26
    },
    "2026-10-07": {
      "pnl": -54.36,
      "roi_pct": -1.45,
      "trades": 28,
      "wins": 16
    },
    "2026-10-08": {
      "pnl": 214.63,
      "roi_pct": 5.81,
      "trades": 23,
      "wins": 22
    },
    "2026-10-09": {
      "pnl": 33.07,
      "roi_pct": 0.85,
      "trades": 9,
      "wins": 7
    },
    "2026-10-11": {
      "pnl": 1.27,
      "roi_pct": 0.03,
      "trades": 16,
      "wins": 12
    },
    "2026-10-12": {
      "pnl": -929.16,
      "roi_pct": -23.57,
      "trades": 27,
      "wins": 10
    },
    "2026-10-13": {
      "pnl": -1.71,
      "roi_pct": -0.06,
      "trades": 50,
      "wins": 38
    },
    "2026-10-14": {
      "pnl": 44.21,
      "roi_pct": 1.47,
      "trades": 46,
      "wins": 36
    },
    "2026-10-15": {
      "pnl": 231.79,
      "roi_pct": 7.59,
      "trades": 23,
      "wins": 18
    },
    "2026-10-16": {
      "pnl": 3.68,
      "roi_pct": 0.11,
      "trades": 4,
      "wins": 2
    },
    "2026-10-18": {
      "pnl": -17.42,
      "roi_pct": -0.53,
      "trades": 9,
      "wins": 5
    },
    "2026-10-19": {
      "pnl": 107.69,
      "roi_pct": 3.29,
      "trades": 21,
      "wins": 17
    },
    "2026-10-20": {
      "pnl": 112.39,
      "roi_pct": 3.32,
      "trades": 27,
      "wins": 21
    },
    "2026-10-22": {
      "pnl": 25.96,
      "roi_pct": 0.74,
      "trades": 10,
      "wins": 7
    },
    "2026-10-25": {
      "pnl": 29.26,
      "roi_pct": 0.83,
      "trades": 4,
      "wins": 3
    },
    "2026-10-26": {
      "pnl": 30.02,
      "roi_pct": 0.85,
      "trades": 7,
      "wins": 4
    },
    "2026-10-27": {
      "pnl": 104.62,
      "roi_pct": 2.92,
      "trades": 5,
      "wins": 5
    },
    "2026-10-28": {
      "pnl": 2.35,
      "roi_pct": 0.06,
      "trades": 1,
      "wins": 1
    },
    "2026-10-29": {
      "pnl": 233.82,
      "roi_pct": 6.34,
      "trades": 34,
      "wins": 29
    },
    "2026-10-30": {
      "pnl": 6.54,
      "roi_pct": 0.17,
      "trades": 3,
      "wins": 2
    },
    "2026-11-01": {
      "pnl": 43.84,
      "roi_pct": 1.12,
      "trades": 6,
      "wins": 4
    }
  },
  "timestamp": "2026-11-01T23:15:21.989700"
}
  };

  CUENTAS_DATA["all"].nombre = "Portafolio Consolidado MT5";

  let chartGrowthInstance = null;
  let chartBarsInstance = null;

  // 3. Renderizar Gráficas de ApexCharts
  function inicializarGraficas(data) {
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
          formatter: (val) => '$' + Math.round(val).toLocaleString()
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

    // Gráfica de Barras ROI Diario
    const ultimosDias = Object.keys(data.calendar_days).sort().slice(-8);
    const barData = ultimosDias.map(fecha => ({
      day: fecha.substring(5),
      roi: data.calendar_days[fecha].roi_pct
    }));

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
              { from: -100, to: -0.001, color: '#f43f5e' },
              { from: 0, to: 100, color: '#10b981' }
            ]
          },
          borderRadius: 6,
          columnWidth: '55%'
        }
      },
      dataLabels: {
        enabled: true,
        formatter: (val) => (val >= 0 ? '+' + val + '%' : val + '%'),
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
          formatter: (val) => val + '%'
        }
      },
      grid: { borderColor: '#1e293b', strokeDashArray: 4 },
      tooltip: { theme: 'dark' }
    };

    if (chartBarsInstance) chartBarsInstance.destroy();
    chartBarsInstance = new ApexCharts(document.getElementById('chart-daily-bars'), barOptions);
    chartBarsInstance.render();
  }

  // 4. Renderizar Calendario Térmico de Rendimiento
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
      } else if (item.fin_semana && !calDays[item.fecha]) {
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

  // 5. Actualizar la vista de la cuenta
  function actualizarVistaCuenta(cuentaKey) {
    const data = CUENTAS_DATA[cuentaKey] || CUENTAS_DATA["51567376"];

    document.getElementById('kpi-balance').textContent = '$' + data.balance.toLocaleString('en-US', { minimumFractionDigits: 2 });
    document.getElementById('kpi-equity').textContent = '$' + data.equity.toLocaleString('en-US', { minimumFractionDigits: 2 });
    
    const flotanteSigno = data.flotante >= 0 ? '+' : '';
    const flotantePct = ((data.flotante / data.balance) * 100).toFixed(2);
    const flotanteEl = document.getElementById('kpi-flotante');
    flotanteEl.textContent = 'Flotante: ' + flotanteSigno + '$' + data.flotante.toLocaleString() + ' (' + flotanteSigno + flotantePct + '%)';
    flotanteEl.className = data.flotante >= 0 ? 'text-[11px] font-bold text-accent-emerald mt-1 mono' : 'text-[11px] font-bold text-accent-rose mt-1 mono';

    document.getElementById('kpi-roi-dia').textContent = (data.roi_dia >= 0 ? '+' : '') + data.roi_dia + '%';
    document.getElementById('kpi-pnl-dia').textContent = 'PnL Hoy: ' + (data.pnl_hoy >= 0 ? '+' : '') + '$' + data.pnl_hoy.toLocaleString() + ' USD';
    document.getElementById('kpi-roi-mes').textContent = (data.roi_mes >= 0 ? '+' : '') + data.roi_mes + '%';
    document.getElementById('kpi-winrate').textContent = data.winrate + '%';
    document.getElementById('kpi-pf').textContent = data.profit_factor;
    document.getElementById('kpi-drawdown').textContent = data.drawdown + '%';

    // Posiciones
    const tableOpen = document.getElementById('table-open-positions');
    const badgeOpenCount = document.getElementById('badge-open-count');
    badgeOpenCount.textContent = data.open_positions.length + ' Activas';
    
    if (data.open_positions.length === 0) {
      tableOpen.innerHTML = '<tr><td colspan="6" class="py-6 text-center text-slate-500 italic">No hay posiciones abiertas en este momento</td></tr>';
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
        <td class="py-2.5 font-semibold text-slate-300">${t.date || 'Hoy'}</td>
        <td class="py-2.5 text-right font-black ${t.pnl >= 0 ? 'text-accent-emerald' : 'text-accent-rose'}">${t.pnl >= 0 ? '+' : ''}$${t.pnl.toFixed(2)}</td>
      </tr>
    `).join('');

    inicializarGraficas(data);
    renderizarCalendarioHeatmap(data);
  }

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

  // Ejecutar inmediatamente
  actualizarVistaCuenta("51567376");
});
