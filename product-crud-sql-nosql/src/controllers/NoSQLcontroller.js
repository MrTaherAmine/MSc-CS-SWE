const Product = require("../models/Product");

// POST /products
async function createProduct(req, res, next) {
  try {
    const product = await Product.create({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      inStock: req.body.inStock
    });

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
}

// GET /products
async function getProducts(req, res, next) {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json({
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
}

// GET /products/:id
async function getProductById(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        error: "Product not found"
      });
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

// PUT /products/:id
async function updateProduct(req, res, next) {
  try {
    const allowedFields = ["name", "price", "category", "inStock"];
    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
        runValidators: true
      }
    );

    if (!product) {
      return res.status(404).json({
        error: "Product not found"
      });
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

// DELETE /products/:id
async function deleteProduct(req, res, next) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        error: "Product not found"
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      data: product
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
