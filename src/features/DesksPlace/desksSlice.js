import { faker } from "@faker-js/faker";
import { createSlice } from "@reduxjs/toolkit";

const makeTask = () => {
  return {
    text: faker.lorem.lines({ min: 1, max: 1 }),
    title: faker.lorem.words({ min: 2, max: 6 }),
    id: faker.string.uuid(),
  };
};

const initialState = {
  desks: [
    {
      name: "To Do",
      data: [...Array.from({ length: 3 }, () => makeTask())],
    },
    {
      name: "In Progress",
      data: [...Array.from({ length: 3 }, () => makeTask())],
    },
    {
      name: "Done",
      data: [...Array.from({ length: 3 }, () => makeTask())],
    },
  ],
};

export const desksSlice = createSlice({
  name: "desks",
  initialState,
  reducers: {
    addDesk: (state, action) => state.desks.push(action.payload),
    removeDesk: (state, action) =>
      state.desks.filter((desk) => desk.id != action.payload),
  },
});

export const { addDesk, removeDesk } = desksSlice.actions;

export default desksSlice.reducer;
