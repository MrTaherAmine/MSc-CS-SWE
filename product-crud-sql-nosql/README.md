# Product CRUD Challenge: SQL & NoSQL Edition

Submission for:

**Backend Development : Working with Databases**

This project implements the same Product CRUD API twice:

- MongoDB using **Mongoose**
- MySQL using **mysql2**

Both controllers expose the same REST flow.

## Product fields

| Field | MongoDB | MySQL |
|---|---|---|
| id | MongoDB `_id` generated automatically | `AUTO_INCREMENT` integer |
| name | String, required | `VARCHAR(150) NOT NULL` |
| price | Number, required, >= 0 | `DECIMAL(10,2) NOT NULL` |
| category | Optional string | Nullable `VARCHAR(100)` |
| inStock | Boolean, default `true` | Boolean, default `TRUE` |

## Required controllers

```text
src/controllers/NoSQLcontroller.js
src/controllers/SQLcontroller.js
```

Both implement:

```text
POST   /products
GET    /products
GET    /products/:id
PUT    /products/:id
DELETE /products/:id
```

## Project structure

```text
product-crud-sql-nosql/
├── database/
│   └── mysql-schema.sql
├── src/
│   ├── config/
│   │   ├── mongo.js
│   │   └── mysql.js
│   ├── controllers/
│   │   ├── NoSQLcontroller.js
│   │   └── SQLcontroller.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── models/
│   │   └── Product.js
│   ├── routes/
│   │   ├── NoSQLroutes.js
│   │   └── SQLroutes.js
│   └── server.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

# Setup

## 1. Install dependencies

```bash
npm install
```

## 2. Create `.env`

Copy:

```text
.env.example
```

to:

```text
.env
```

The same `/products` routes are used for both systems. Change `DB_MODE` to select the backend.

---

# MongoDB / Mongoose mode

Set:

```env
DB_MODE=nosql
MONGODB_URI=mongodb://127.0.0.1:27017/product_crud_checkpoint
```

Make sure MongoDB is running.

Start:

```bash
npm run mongo
```

or set `DB_MODE=nosql` and run:

```bash
npm start
```

The Mongoose schema is:

```text
src/models/Product.js
```

Mongoose automatically generates `_id` for each product.

---

# MySQL mode

Create the database/table by executing:

```text
database/mysql-schema.sql
```

For example:

```bash
mysql -u root -p < database/mysql-schema.sql
```

Configure:

```env
DB_MODE=sql
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=product_crud_checkpoint
```

Start:

```bash
npm run mysql
```

The SQL controller uses `mysql2` Promise pools and `execute()` with placeholders.

Example parameterized statement:

```js
await pool.execute(
  "SELECT * FROM products WHERE id = ?",
  [req.params.id]
);
```

Values are supplied separately instead of concatenating input into SQL strings.

---

# API examples

The server normally runs at:

```text
http://localhost:3000
```

## Create

```bash
curl -X POST http://localhost:3000/products   -H "Content-Type: application/json"   -d '{
    "name": "Mechanical Keyboard",
    "price": 129.90,
    "category": "Accessories",
    "inStock": true
  }'
```

## Read all

```bash
curl http://localhost:3000/products
```

## Read one

MongoDB example:

```bash
curl http://localhost:3000/products/MONGODB_OBJECT_ID
```

MySQL example:

```bash
curl http://localhost:3000/products/1
```

## Update

```bash
curl -X PUT http://localhost:3000/products/1   -H "Content-Type: application/json"   -d '{
    "price": 119.90,
    "inStock": false
  }'
```

Use a MongoDB ObjectId instead of `1` when running NoSQL mode.

## Delete

```bash
curl -X DELETE http://localhost:3000/products/1
```

---

# SQL vs NoSQL comparison

## MongoDB / Mongoose

CRUD is model-oriented.

Examples:

```js
Product.create(...)
Product.find()
Product.findById(...)
Product.findByIdAndUpdate(...)
Product.findByIdAndDelete(...)
```

The schema defines validation and defaults in the application model.

## MySQL / mysql2

CRUD is SQL-oriented.

Examples:

```sql
INSERT INTO products ...
SELECT * FROM products ...
UPDATE products SET ... WHERE id = ?
DELETE FROM products WHERE id = ?
```

The SQL controller uses parameter placeholders (`?`) and `execute()` for values.

## Consistent behavior

Despite the different persistence models, both controllers preserve the same API contract:

- same resource: Product
- same HTTP methods
- same route names
- similar validation
- `201` for creation
- `200` for successful reads/updates/deletes
- `400` for invalid input
- `404` for missing products

## Author

Taher Amine ELHOUARI
