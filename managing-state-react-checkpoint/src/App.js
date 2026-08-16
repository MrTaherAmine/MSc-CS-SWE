import React, { useEffect, useMemo, useState } from "react";
import { Badge, Container } from "react-bootstrap";
import TaskFilter from "./components/TaskFilter";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

const STORAGE_KEY = "taskflow.tasks";

const starterTasks = [
  {
    id: 1,
    name: "Review React state management",
    description: "Practice updating arrays and objects without mutating state.",
    completed: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: "Finish the checkpoint",
    description: "Complete the To-Do List application and push it to GitHub.",
    completed: false,
    createdAt: new Date().toISOString()
  }
];

function loadInitialTasks() {
  try {
    const storedTasks = localStorage.getItem(STORAGE_KEY);

    if (storedTasks) {
      return JSON.parse(storedTasks);
    }
  } catch (error) {
    console.error("Unable to read tasks from localStorage:", error);
  }

  return starterTasks;
}

function App() {
  const [tasks, setTasks] = useState(loadInitialTasks);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("all");

  // Persist tasks every time the task list changes.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("Unable to save tasks to localStorage:", error);
    }
  }, [tasks]);

  const handleTaskSubmit = (taskData) => {
    if (editingTask) {
      setTasks((previousTasks) =>
        previousTasks.map((task) =>
          task.id === editingTask.id
            ? { ...task, ...taskData }
            : task
        )
      );

      setEditingTask(null);
      return;
    }

    const newTask = {
      id: Date.now(),
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString()
    };

    setTasks((previousTasks) => [newTask, ...previousTasks]);
  };

  const handleToggleTask = (taskId) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteTask = (taskId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) {
      return;
    }

    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== taskId)
    );

    if (editingTask?.id === taskId) {
      setEditingTask(null);
    }
  };

  const filteredTasks = useMemo(() => {
    if (filter === "active") {
      return tasks.filter((task) => !task.completed);
    }

    if (filter === "completed") {
      return tasks.filter((task) => task.completed);
    }

    return tasks;
  }, [tasks, filter]);

  const counts = {
    all: tasks.length,
    active: tasks.filter((task) => !task.completed).length,
    completed: tasks.filter((task) => task.completed).length
  };

  return (
    <div className="App">
      <Container className="page-shell">
        <header className="hero text-center">
          <Badge bg="primary" className="mb-3 px-3 py-2">
            Managing State in React
          </Badge>

          <h1>TaskFlow</h1>

          <p>
            A persistent React To-Do List with validation, editing, deletion,
            completion tracking, filtering, and browser storage.
          </p>
        </header>

        <TaskForm
          onSubmit={handleTaskSubmit}
          editingTask={editingTask}
          onCancelEdit={() => setEditingTask(null)}
        />

        <TaskFilter
          filter={filter}
          onChange={setFilter}
          counts={counts}
        />

        <TaskList
          tasks={filteredTasks}
          onToggle={handleToggleTask}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />

        <footer className="text-center">
          <p>Checkpoint Managing State in React — Taher Amine ELHOUARI</p>
        </footer>
      </Container>
    </div>
  );
}

export default App;
