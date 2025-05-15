import { configureStore } from "@reduxjs/toolkit";
import deskReducer from "../features/DesksPlace/desksSlice";
import themeReducer from "../features/theme/themeSlice";

export const store = configureStore({
  reducer: {
    desks: deskReducer,
    theme: themeReducer,
  },
});
