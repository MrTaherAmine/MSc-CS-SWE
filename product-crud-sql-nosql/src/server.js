require("dotenv").config();

const express = require("express");
const connectMongo = require("./config/mongo");
const { testMySQLConnection } = require("./config/mysql");
const NoSQLroutes = require("./routes/NoSQLroutes");
const SQLroutes = require("./routes/SQLroutes");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();
const PORT = Number(process.env.PORT || 3000);
const DB_MODE = (process.env.DB_MODE || "nosql").toLowerCase();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    project: "Product CRUD Challenge: SQL & NoSQL Edition",
    activeDatabase: DB_MODE,
    endpoint: "/products"
  });
});

async function start() {
  if (DB_MODE === "nosql") {
    await connectMongo();
    app.use("/products", NoSQLroutes);
  } else if (DB_MODE === "sql") {
    await testMySQLConnection();
    app.use("/products", SQLroutes);
  } else {
    throw new Error('DB_MODE must be either "nosql" or "sql".');
  }

  app.use(notFound);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(
      `Product API (${DB_MODE}) running at http://localhost:${PORT}`
    );
  });
}

start().catch((error) => {
  console.error("Unable to start application:", error.message);
  process.exit(1);
});
