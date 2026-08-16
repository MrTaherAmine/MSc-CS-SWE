import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice";

// Global Redux store.
const store = configureStore({
  reducer: {
    tasks: tasksReducer
  }
});

export default store;
