import { createSlice, nanoid } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    tasks: [],
    completed: [],
  },
  reducers: {
    addTask: {
      reducer: (state, action) => {
        state.tasks.unshift(action.payload);
      },
      prepare: (text) => ({
        payload: { id: nanoid(), text: text.trim() },
      }),
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
    completeTask: (state, action) => {
      const id = action.payload;
      const task = state.tasks.find((t) => t.id === id);
      if (!task) return;

      state.completed.unshift({
        ...task,
        completedAt: new Date().toISOString(),
      });
      state.tasks = state.tasks.filter((t) => t.id !== id);
    },
    clearCompleted: (state) => {
      state.completed = [];
    },
  },
});

export const { addTask, deleteTask, completeTask, clearCompleted } = todoSlice.actions;
export default todoSlice.reducer;
