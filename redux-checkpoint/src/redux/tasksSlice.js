import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [
    {
      id: 1,
      description: "Review Redux fundamentals",
      isDone: true
    },
    {
      id: 2,
      description: "Complete the Redux checkpoint",
      isDone: false
    }
  ],
  filter: "all"
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // Add a new task to the global Redux state.
    addTask: (state, action) => {
      state.tasks.push({
        id: Date.now(),
        description: action.payload,
        isDone: false
      });
    },

    // Toggle a task between done and not done.
    toggleTask: (state, action) => {
      const task = state.tasks.find((item) => item.id === action.payload);

      if (task) {
        task.isDone = !task.isDone;
      }
    },

    // Edit the description of an existing task.
    editTask: (state, action) => {
      const { id, description } = action.payload;
      const task = state.tasks.find((item) => item.id === id);

      if (task) {
        task.description = description;
      }
    },

    // Change the active task filter.
    setFilter: (state, action) => {
      state.filter = action.payload;
    }
  }
});

export const { addTask, toggleTask, editTask, setFilter } =
  tasksSlice.actions;

export default tasksSlice.reducer;
