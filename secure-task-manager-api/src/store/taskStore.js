const { randomUUID } = require("crypto");

const tasks = [];

function createTask({ ownerId, title, description = "" }) {
  const task = {
    id: randomUUID(),
    ownerId,
    title,
    description,
    createdAt: new Date().toISOString()
  };

  tasks.push(task);
  return task;
}

function getTasksByOwner(ownerId) {
  return tasks.filter((task) => task.ownerId === ownerId);
}

function findTaskById(id) {
  return tasks.find((task) => task.id === id) || null;
}

function deleteTaskById(id) {
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    return null;
  }

  const [deletedTask] = tasks.splice(index, 1);
  return deletedTask;
}

module.exports = {
  tasks,
  createTask,
  getTasksByOwner,
  findTaskById,
  deleteTaskById
};
