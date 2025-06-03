// import { faker } from "@faker-js/faker";
import { faker } from "@faker-js/faker";
import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";

const makeTask = () => {
  return {
    text: faker.lorem.lines({ min: 1, max: 1 }),
    title: faker.lorem.words({ min: 2, max: 6 }),
    id: faker.string.uuid(),
  };
};

const initialState = [
  {
    name: "To Do",
    data: [...Array.from({ length: 3 }, () => makeTask())],
    id: nanoid(),
  },
  {
    name: "In Progress",
    data: [...Array.from({ length: 3 }, () => makeTask())],
    id: nanoid(),
  },
  {
    name: "Done",
    data: [...Array.from({ length: 3 }, () => makeTask())],
    id: nanoid(),
  },
];
// const initialState = [
//   {
//     name: "To Do",
//     data: [],
//      id: nanoid(),
//   },
//   {
//     name: "In Progress",
//     data: [],
//      id: nanoid(),
//   },
//   {
//     name: "Done",
//     data: [],
//      id: nanoid(),
//   },
// ];

const saveToLocalStorage = (state) => {
  try {
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
    if (!desksLoc) saveToLocalStorage(initialState);
    return desksLoc ? JSON.parse(desksLoc) : desks;
  }
);

export const desksSlice = createSlice({
  name: "desks",
  initialState,
  reducers: {
    addDesk: {
      reducer: (state, action) => {
        state.push(action.payload);
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
        state = state.filter((desk) => desk.name !== action.payload);
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
        state.forEach((desk) => {
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
        const desk = state.find((desk) => desk.name === deskName);
        console.log(desk);
        desk.data = data;
      },
      prepare(deskName, data) {
        return {
          payload: { deskName, data },
          meta: { save: true },
        };
      },
    },
    updateDeskDataById: {
      reducer(state, action) {
        const { deskId, data } = action.payload;
        const desk = state.find((desk) => desk.id === deskId);
        desk.data = data;
      },
      prepare(deskId, data) {
        return {
          payload: { deskId, data },
          meta: { save: true },
        };
      },
    },
    // updateDeskDataByIdWithDrag: {
    //   reducer(state, action) {
    //     console.log("hi wtf");
    //     const { deskId, taskId } = action.payload;
    //     const desk = state.find((desk) => desk.id === deskId);
    //     const prevDesk = state.find((desk) => {
    //       for (let i = 0; i < desk.length; i++) {
    //         return desk.data[i].id === taskId;
    //       }
    //       return -1;
    //     });
    //     if (desk === prevDesk) return;
    //     const task = prevDesk.data.find((task) => task.id === taskId);
    //     const taskIndex = prevDesk.data.findIndex((task) => task.id === taskId);
    //     desk.data.push(task);
    //     prevDesk.data.splice(taskIndex, 1);
    //   },
    //   prepare(deskId, taskId) {
    //     return {
    //       payload: { deskId, taskId },
    //       meta: { save: true },
    //     };
    //   },
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeDesksData.fulfilled, (state, action) => {
        return action.payload;
      })
      .addMatcher(
        (action) => action.meta?.save,
        (state) => saveToLocalStorage(state)
      );
  },
});

export const selectDeskByTitle = (state, id) =>
  state.desks.find((desk) => desk.name === id);

export const selectTaskById = (state, id) => {
  if (!id) return;
  const desk = state.desks.find((desk) =>
    desk.data.find((task) => task.id === id)
  );
  const task = desk.data.find((task) => task.id === id);
  return task;
};

export const selectDeskByTaskId = (state, taskId) =>
  state.desks.find((desk) => desk.data.find((task) => task.id === taskId));

export const {
  addDesk,
  removeDesk,
  renameDesk,
  updateDeskData,
  updateDeskDataById,
  // updateDeskDataByIdWithDrag,
} = desksSlice.actions;

export default desksSlice.reducer;
