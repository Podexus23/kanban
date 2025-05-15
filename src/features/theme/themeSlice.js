import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light", // "light" | "dark"
};

export const toggleTheme = createAsyncThunk(
  "theme/toggle",
  async (_, { getState }) => {
    const { theme } = getState().theme;
    const newTheme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("doska_theme", newTheme);

    return newTheme;
  }
);

export const initializeTheme = createAsyncThunk(
  "theme/initialize",
  async (_, { getState }) => {
    const { theme } = getState().theme;
    const themeLoc = localStorage.getItem("doska_theme");
    return themeLoc ? themeLoc : theme;
  }
);

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(toggleTheme.fulfilled, (state, action) => {
        console.log(action);
        state.theme = action.payload;
      })
      .addCase(initializeTheme.fulfilled, (state, action) => {
        state.theme = action.payload;
        document.documentElement.setAttribute("data-theme", action.payload);
      });
  },
});

export default themeSlice.reducer;
