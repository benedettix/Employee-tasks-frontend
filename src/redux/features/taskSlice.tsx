import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TaskInterface {
  id: number;
  attributes: {
    Title: string;
    Description: string;
    assignee: {
      employee: number[];
    };
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
    duedate: string;
  };
}

export interface TaskState {
  tasks: TaskInterface[];
  loader: boolean;
  info: string;
}

const initialState: TaskState = {
  tasks: [],
  loader: false,
  info: "",
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    updateTasks: (state, action: PayloadAction<TaskInterface[]>) => {
      state.tasks = action.payload;
    },
    loaderPatch: (state, action: PayloadAction<boolean>) => {
      state.loader = action.payload;
    },
    updateInfo: (state, action: PayloadAction<string>) => {
      state.info = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateTasks, loaderPatch, updateInfo } = tasksSlice.actions;

export default tasksSlice.reducer;
