const AppError = require("../utils/AppError");

function validateTask(req, res, next) {
  const { title, description } = req.body;

  if (typeof title !== "string" || title.trim().length < 1) {
    return next(new AppError("Task title is required.", 400));
  }

  if (title.length > 120) {
    return next(new AppError("Task title must be 120 characters or fewer.", 400));
  }

  if (description !== undefined && typeof description !== "string") {
    return next(new AppError("Task description must be a string.", 400));
  }

  req.body.title = title.trim();
  req.body.description = description?.trim() || "";

  next();
}

module.exports = validateTask;
