import { faker } from "@faker-js/faker";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const makeTask = () => {
  return {
    text: faker.lorem.lines({ min: 1, max: 1 }),
    title: faker.lorem.words({ min: 2, max: 6 }),
    id: faker.string.uuid(),
  };
};

// const initialState = {
//   desks: [
//     {
//       name: "To Do",
//       data: [...Array.from({ length: 3 }, () => makeTask())],
//     },
//     {
//       name: "In Progress",
//       data: [...Array.from({ length: 3 }, () => makeTask())],
//     },
//     {
//       name: "Done",
//       data: [...Array.from({ length: 3 }, () => makeTask())],
//     },
//   ],
// };

const initialState = {
  desks: [
    {
      name: "To Do",
      data: [],
    },
    {
      name: "In Progress",
      data: [],
    },
    {
      name: "Done",
      data: [],
    },
  ],
};

const saveToLocalStorage = (state) => {
  try {
    console.log("hi");
    localStorage.setItem("kan_data", JSON.stringify(state));
  } catch (error) {
    console.error("LocalStorage save Error: ", error);
  }
};

export const initializeDesksData = createAsyncThunk(
  "desks/initialize",
  async (_, { getState }) => {
    const { desks } = getState().desks;
    const desksLoc = localStorage.getItem("kan_data");
    return desksLoc ? JSON.parse(desksLoc) : desks;
  }
);

export const desksSlice = createSlice({
  name: "desks",
  initialState,
  reducers: {
    addDesk: {
      reducer: (state, action) => {
        state.desks.push(action.payload);
      },
      prepare(data) {
        return {
          payload: data,
          meta: { save: true },
        };
      },
    },
    removeDesk: {
      reducer: (state, action) => {
        state.desks = state.desks.filter(
          (desk) => desk.name !== action.payload
        );
      },
      prepare(data) {
        return {
          payload: data,
          meta: { save: true },
        };
      },
    },
    renameDesk: {
      reducer(state, action) {
        const { oldName, newName } = action.payload;
        state.desks.forEach((desk) => {
          if (desk.name === oldName) desk.name = newName;
        });
      },
      prepare(oldName, newName) {
        return {
          payload: { oldName, newName },
          meta: { save: true },
        };
      },
    },
    updateDeskData: {
      reducer(state, action) {
        const { deskName, data } = action.payload;
        const desk = state.desks.find((desk) => desk.name === deskName);
        desk.data = data;
      },
      prepare(deskName, data) {
        return { payload: { deskName, data }, meta: { save: true } };
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeDesksData.fulfilled, (state, action) => {
        state.desks = action.payload;
      })
      .addMatcher(
        (action) => action.meta?.save,
        (state) => saveToLocalStorage(state.desks)
      );
  },
});

export const { addDesk, removeDesk, renameDesk, updateDeskData } =
  desksSlice.actions;

export default desksSlice.reducer;
