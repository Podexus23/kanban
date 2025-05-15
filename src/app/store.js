import { configureStore } from "@reduxjs/toolkit";
import deskReducer from "../features/DesksPlace/desksSlice";

export const store = configureStore({
  reducer: {
    desks: deskReducer,
    theme: themeReducer,
  },
});
