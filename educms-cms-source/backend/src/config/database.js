const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME || 'educms_db',
  user: process.env.DB_USER || 'educms',
  password: process.env.DB_PASSWORD || 'educms_dev_password',
  max: Number(process.env.DB_POOL_MAX || 10),
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 3000
});

async function query(text, params = []) {
  return pool.query(text, params);
}

async function testConnection() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('PostgreSQL connected:', result.rows[0].now);
    return true;
  } catch (error) {
    console.error('PostgreSQL connection failed:', error.message);
    return false;
  }
}

module.exports = { pool, query, testConnection };
