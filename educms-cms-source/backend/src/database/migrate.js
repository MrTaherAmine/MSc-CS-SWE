require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { pool } = require('../config/database');

(async () => {
  try {
    const sql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    await pool.query(sql);
    console.log('Database migration complete');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
