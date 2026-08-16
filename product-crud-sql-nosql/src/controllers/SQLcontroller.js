const { getMySQLPool } = require("../config/mysql");

function validateCreatePayload(body) {
  const errors = [];

  if (typeof body.name !== "string" || body.name.trim() === "") {
    errors.push("name is required and must be a non-empty string");
  }

  if (
    body.price === undefined ||
    body.price === null ||
    Number.isNaN(Number(body.price)) ||
    Number(body.price) < 0
  ) {
    errors.push("price is required and must be a non-negative number");
  }

  if (
    body.inStock !== undefined &&
    typeof body.inStock !== "boolean"
  ) {
    errors.push("inStock must be a boolean");
  }

  return errors;
}

// POST /products
async function createProduct(req, res, next) {
  try {
    const errors = validateCreatePayload(req.body);

    if (errors.length > 0) {
      return res.status(400).json({
        error: "Validation failed",
        details: errors
      });
    }

    const pool = getMySQLPool();

    // Parameterized statement: values are supplied separately from SQL text.
    const [result] = await pool.execute(
      `INSERT INTO products (name, price, category, inStock)
       VALUES (?, ?, ?, ?)`,
      [
        req.body.name.trim(),
        Number(req.body.price),
        req.body.category ?? null,
        req.body.inStock ?? true
      ]
    );

    const [rows] = await pool.execute(
      "SELECT * FROM products WHERE id = ?",
      [result.insertId]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    next(error);
  }
}

// GET /products
async function getProducts(req, res, next) {
  try {
    const pool = getMySQLPool();

    const [rows] = await pool.execute(
      "SELECT * FROM products ORDER BY id DESC"
    );

    res.status(200).json({
      count: rows.length,
      data: rows
    });
  } catch (error) {
    next(error);
  }
}

// GET /products/:id
async function getProductById(req, res, next) {
  try {
    const pool = getMySQLPool();

    const [rows] = await pool.execute(
      "SELECT * FROM products WHERE id = ?",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        error: "Product not found"
      });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    next(error);
  }
}

// PUT /products/:id
async function updateProduct(req, res, next) {
  try {
    const pool = getMySQLPool();

    const [existingRows] = await pool.execute(
      "SELECT * FROM products WHERE id = ?",
      [req.params.id]
    );

    if (existingRows.length === 0) {
      return res.status(404).json({
        error: "Product not found"
      });
    }

    const existing = existingRows[0];

    const name =
      req.body.name !== undefined ? req.body.name : existing.name;
    const price =
      req.body.price !== undefined ? req.body.price : existing.price;
    const category =
      req.body.category !== undefined ? req.body.category : existing.category;
    const inStock =
      req.body.inStock !== undefined
        ? req.body.inStock
        : Boolean(existing.inStock);

    const errors = validateCreatePayload({
      name,
      price,
      category,
      inStock
    });

    if (errors.length > 0) {
      return res.status(400).json({
        error: "Validation failed",
        details: errors
      });
    }

    await pool.execute(
      `UPDATE products
       SET name = ?, price = ?, category = ?, inStock = ?
       WHERE id = ?`,
      [
        name.trim(),
        Number(price),
        category ?? null,
        inStock,
        req.params.id
      ]
    );

    const [updatedRows] = await pool.execute(
      "SELECT * FROM products WHERE id = ?",
      [req.params.id]
    );

    res.status(200).json(updatedRows[0]);
  } catch (error) {
    next(error);
  }
}

// DELETE /products/:id
async function deleteProduct(req, res, next) {
  try {
    const pool = getMySQLPool();

    const [rows] = await pool.execute(
      "SELECT * FROM products WHERE id = ?",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        error: "Product not found"
      });
    }

    await pool.execute(
      "DELETE FROM products WHERE id = ?",
      [req.params.id]
    );

    res.status(200).json({
      message: "Product deleted successfully",
      data: rows[0]
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
