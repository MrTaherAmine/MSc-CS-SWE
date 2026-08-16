const express = require("express");
const controller = require("../controllers/NoSQLcontroller");

const router = express.Router();

router
  .route("/")
  .post(controller.createProduct)
  .get(controller.getProducts);

router
  .route("/:id")
  .get(controller.getProductById)
  .put(controller.updateProduct)
  .delete(controller.deleteProduct);

module.exports = router;
