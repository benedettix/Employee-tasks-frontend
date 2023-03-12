import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface EmployeeInterface {
  id: number;
  attributes: {
    birthdate: string;
    createdAt: string;
    email: string;
    finishedTasks: {
      finished: number[];
    };
    fullname: string;
    image: {
      data: any;
    };
    phonenumber: string;
    publishedAt: string;
    salary: string;
    tasks: {
      tasks: number[];
    };
    updatedAt: string;
  };
}

export interface EmployeesState {
  employees: EmployeeInterface[];
}

const initialState: EmployeesState = {
  employees: [],
};

export const employeesSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    updateEmployees: (state, action: PayloadAction<EmployeeInterface[]>) => {
      state.employees = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateEmployees } = employeesSlice.actions;

export default employeesSlice.reducer;
