const AppError = require("../utils/AppError");
const {
  createTask,
  getTasksByOwner,
  findTaskById,
  deleteTaskById
} = require("../store/taskStore");

async function create(req, res) {
  const task = createTask({
    ownerId: req.user.id,
    title: req.body.title,
    description: req.body.description
  });

  res.status(201).json({
    status: "success",
    data: task
  });
}

async function list(req, res) {
  const tasks = getTasksByOwner(req.user.id);

  res.status(200).json({
    status: "success",
    count: tasks.length,
    data: tasks
  });
}

async function remove(req, res, next) {
  const task = findTaskById(req.params.id);

  if (!task) {
    return next(new AppError("Task not found.", 404));
  }

  if (task.ownerId !== req.user.id) {
    return next(new AppError("You do not own this task.", 403));
  }

  const deletedTask = deleteTaskById(task.id);

  res.status(200).json({
    status: "success",
    message: "Task deleted.",
    data: deletedTask
  });
}

module.exports = {
  create,
  list,
  remove
};
