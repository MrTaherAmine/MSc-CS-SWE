const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const validateTask = require("../middleware/validateTask");
const catchAsync = require("../utils/catchAsync");
const {
  create,
  list,
  remove
} = require("../controllers/taskController");

const router = express.Router();

// Every task route is private.
router.use(verifyToken);

router
  .route("/")
  .post(validateTask, catchAsync(create))
  .get(catchAsync(list));

router.delete("/:id", catchAsync(remove));

module.exports = router;
