const mysql = require("mysql2/promise");

let pool;

function getMySQLPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.MYSQL_HOST || "127.0.0.1",
      port: Number(process.env.MYSQL_PORT || 3306),
      user: process.env.MYSQL_USER || "root",
      password: process.env.MYSQL_PASSWORD || "",
      database: process.env.MYSQL_DATABASE || "product_crud_checkpoint",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }

  return pool;
}

async function testMySQLConnection() {
  const connectionPool = getMySQLPool();
  await connectionPool.execute("SELECT 1");
  console.log("MySQL connected.");
}

module.exports = {
  getMySQLPool,
  testMySQLConnection
};
