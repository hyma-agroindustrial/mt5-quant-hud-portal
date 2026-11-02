// MT5 Quant Portal - Servidor Backend API & Archivos Estáticos
// Arquitectura Node.js Nativa (Cero dependencias externas requeridas)

const http = require('node:http');
const url = require('node:url');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { db, hashPassword, verifyPassword } = require('./database');

const PORT = process.env.PORT || 3000;
const CLIENT_DIR = path.join(__dirname, '..', 'client');
const JWT_SECRET = process.env.JWT_SECRET || 'quant_secret_key_88492011';

// Helpers para respuestas HTTP
function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
  });
}

// Token firmado simple HMAC-SHA256
function generarToken(user) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({ 
    sub: user.username, 
    role: user.role, 
    exp: Date.now() + (24 * 60 * 60 * 1000) 
  })).toString('base64url');
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${payload}`).digest('base64url');
  return `${header}.${payload}.${signature}`;
}

// MIME types para archivos estáticos
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Manejo de pre-flight CORS
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return res.end();
  }

  // ==========================================
  // RUTAS DE LA API REST
  // ==========================================

  // 1. Registro de usuario
  if (pathname === '/api/auth/register' && method === 'POST') {
    try {
      const body = await parseBody(req);
      const { username, email, password } = body;
      if (!username || !password) return sendJSON(res, 400, { error: 'Usuario y contraseña requeridos' });

      const existing = db.prepare('SELECT id FROM users WHERE username = ?').get(username);
      if (existing) return sendJSON(res, 409, { error: 'El usuario ya existe' });

      const { hash, salt } = hashPassword(password);
      db.prepare(`
        INSERT INTO users (username, email, password_hash, salt, role)
        VALUES (?, ?, ?, ?, 'trader')
      `).run(username, email || '', hash, salt);

      const token = generarToken({ username, role: 'trader' });
      return sendJSON(res, 201, { success: true, token, username });
    } catch (e) {
      return sendJSON(res, 500, { error: e.message });
    }
  }

  // 2. Inicio de sesión (Login)
  if (pathname === '/api/auth/login' && method === 'POST') {
    try {
      const { username, password } = await parseBody(req);
      const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
      if (!user || !verifyPassword(password, user.password_hash, user.salt)) {
        return sendJSON(res, 401, { error: 'Credenciales inválidas' });
      }

      const token = generarToken(user);
      return sendJSON(res, 200, { success: true, token, username: user.username, role: user.role });
    } catch (e) {
      return sendJSON(res, 500, { error: e.message });
    }
  }

  // 3. Listar cuentas MT5 vinculadas
  if (pathname === '/api/accounts' && method === 'GET') {
    const accounts = db.prepare('SELECT account_id, account_name, broker, server, initial_balance FROM trading_accounts').all();
    return sendJSON(res, 200, { accounts });
  }

  // 4. Ingesta de Telemetría (Snapshots de MT5)
  if (pathname === '/api/telemetry/snapshot' && method === 'POST') {
    try {
      const snap = await parseBody(req);
      const login = snap.login;
      if (!login) return sendJSON(res, 400, { error: 'Falta campo login' });

      // Guardar snapshot de equidad
      db.prepare(`
        INSERT INTO equity_snapshots (account_id, balance, equity, floating_pnl, margin, free_margin)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(login, snap.balance, snap.equity, snap.flotante, snap.margin || 0, snap.free_margin || 0);

      // Upsert en resumen diario
      const fechaHoy = new Date().toISOString().split('T')[0];
      const startBalance = snap.balance - (snap.pnl_hoy || 0);
      const roiPct = snap.roi_diario_pct || 0;

      db.prepare(`
        INSERT INTO daily_summaries (account_id, date, start_balance, end_balance, net_pnl, roi_pct, trades_count, winrate_pct)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(account_id, date) DO UPDATE SET
          end_balance = excluded.end_balance,
          net_pnl = excluded.net_pnl,
          roi_pct = excluded.roi_pct,
          trades_count = excluded.trades_count,
          winrate_pct = excluded.winrate_pct
      `).run(login, fechaHoy, startBalance, snap.balance, snap.pnl_hoy || 0, roiPct, snap.trades_hoy || 0, snap.winrate_hoy || 0);

      return sendJSON(res, 200, { success: true, recorded_at: new Date().toISOString() });
    } catch (e) {
      return sendJSON(res, 500, { error: e.message });
    }
  }

  // 5. KPIs y Analítica
  if (pathname === '/api/analytics/kpis' && method === 'GET') {
    const accountId = parsedUrl.query.account_id;
    let query = 'SELECT * FROM trading_accounts';
    if (accountId && accountId !== 'all') {
      query += ` WHERE account_id = ${parseInt(accountId, 10)}`;
    }
    const accounts = db.prepare(query).all();
    return sendJSON(res, 200, { success: true, accounts });
  }

  // ==========================================
  // SERVIR ARCHIVOS ESTÁTICOS (CLIENTE WEB)
  // ==========================================
  let filePath = path.join(CLIENT_DIR, pathname === '/' ? 'index.html' : pathname);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Redirigir a index.html si no existe el archivo estático
        fs.readFile(path.join(CLIENT_DIR, 'index.html'), (err2, fallbackContent) => {
          if (err2) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(fallbackContent, 'utf-8');
          }
        });
      } else {
        res.writeHead(500);
        res.end(`Error del servidor: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 [MT5 QUANT HUD PORTAL] Servidor iniciado con éxito`);
  console.log(`📡 URL Local: http://localhost:${PORT}`);
  console.log(`🔐 Pantalla de Login: http://localhost:${PORT}/login.html`);
  console.log(`📊 Terminal HUD: http://localhost:${PORT}/index.html`);
  console.log(`💾 Base de Datos: SQLite Integrada lista`);
  console.log(`=======================================================`);
});
