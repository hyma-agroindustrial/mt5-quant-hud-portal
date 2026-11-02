// MT5 Quant Portal - Database Engine (Built-in Node.js SQLite)
const { DatabaseSync } = require('node:sqlite');
const path = require('node:path');
const crypto = require('node:crypto');

const DB_PATH = path.join(__dirname, 'quant_portal.db');
const db = new DatabaseSync(DB_PATH);

// Inicializar tablas
db.exec(`
  PRAGMA journal_mode = WAL;

  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT,
    password_hash TEXT NOT NULL,
    salt TEXT NOT NULL,
    role TEXT DEFAULT 'trader',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS trading_accounts (
    account_id INTEGER PRIMARY KEY,
    account_name TEXT NOT NULL,
    broker TEXT,
    server TEXT,
    currency TEXT DEFAULT 'USD',
    initial_balance REAL DEFAULT 100000.0,
    api_key TEXT,
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS equity_snapshots (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    account_id INTEGER,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    balance REAL NOT NULL,
    equity REAL NOT NULL,
    floating_pnl REAL NOT NULL,
    margin REAL,
    free_margin REAL,
    FOREIGN KEY(account_id) REFERENCES trading_accounts(account_id)
  );

  CREATE TABLE IF NOT EXISTS daily_summaries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    account_id INTEGER,
    date TEXT NOT NULL,
    start_balance REAL NOT NULL,
    end_balance REAL NOT NULL,
    net_pnl REAL NOT NULL,
    roi_pct REAL NOT NULL,
    trades_count INTEGER DEFAULT 0,
    wins_count INTEGER DEFAULT 0,
    losses_count INTEGER DEFAULT 0,
    winrate_pct REAL DEFAULT 0.0,
    max_drawdown_pct REAL DEFAULT 0.0,
    UNIQUE(account_id, date)
  );

  CREATE TABLE IF NOT EXISTS trades_history (
    ticket INTEGER PRIMARY KEY,
    account_id INTEGER,
    symbol TEXT NOT NULL,
    type TEXT NOT NULL,
    lots REAL NOT NULL,
    open_time DATETIME,
    close_time DATETIME,
    open_price REAL,
    close_price REAL,
    profit REAL NOT NULL,
    swap REAL DEFAULT 0.0,
    commission REAL DEFAULT 0.0,
    net_profit REAL NOT NULL,
    pips REAL DEFAULT 0.0,
    FOREIGN KEY(account_id) REFERENCES trading_accounts(account_id)
  );
`);

// Funciones de Hashing seguro
function hashPassword(password, salt = null) {
  if (!salt) salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return { hash, salt };
}

function verifyPassword(password, hash, salt) {
  const check = crypto.scryptSync(password, salt, 64).toString('hex');
  return check === hash;
}

// Sembrar cuentas demo por defecto si la base de datos está vacía
const checkAccounts = db.prepare('SELECT COUNT(*) as count FROM trading_accounts').get();
if (checkAccounts.count === 0) {
  console.log('[DB] Inicializando cuentas base de MT5...');
  const insertAccount = db.prepare(`
    INSERT INTO trading_accounts (account_id, account_name, broker, server, initial_balance)
    VALUES (?, ?, ?, ?, ?)
  `);
  insertAccount.run(61602115, 'Valyrian Gold AntiToxic', 'MetaQuotes-Demo', 'Live-Server', 50000.0);
  insertAccount.run(88492011, 'FriasBot Scalper Pro (FTMO)', 'FTMO-Server', 'Prop-Live', 40000.0);
  insertAccount.run(10294822, 'Asia Session Dynamic Bot', 'ICMarkets-SC', 'Live02', 15000.0);

  // Sembrar usuario administrador por defecto
  const adminPass = hashPassword('admin123');
  db.prepare(`
    INSERT INTO users (username, email, password_hash, salt, role)
    VALUES (?, ?, ?, ?, ?)
  `).run('admin', 'admin@quanthud.com', adminPass.hash, adminPass.salt, 'master_trader');
}

module.exports = {
  db,
  hashPassword,
  verifyPassword
};
