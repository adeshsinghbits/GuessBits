import { configureStore } from "@reduxjs/toolkit";
import memoryReducer from "./memorySlice";

export const store = configureStore({
  reducer: {
    memory: memoryReducer,
  },
});