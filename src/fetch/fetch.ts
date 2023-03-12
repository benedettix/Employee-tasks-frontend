import { AnyAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Dispatch } from 'redux';

import { updateEmployees } from "../redux/features/employeesSlice";
import { loaderPatch, updateTasks, updateInfo } from "../redux/features/taskSlice";
import token from "../token";

axios.defaults.baseURL = "http://localhost:1337/";

export const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export function fetchEmployees(dispatch:  Dispatch<AnyAction>) {
  dispatch(loaderPatch(true))
  axios
    .get("api/employees?populate=*", config)
    .then(function (response: any) {
      console.log(response.data.data);
      dispatch(updateEmployees(response.data.data));
      dispatch(loaderPatch(false))
    })
    .catch(function (error: any) {
      console.log(error);
    });
}

export function fetchTasks(dispatch:  Dispatch<AnyAction>) {
  dispatch(loaderPatch(true))
  axios
    .get("api/tasks?populate=*", config)
    .then(function (response: any) {
      console.log(response.data.data);
      dispatch(updateTasks(response.data.data));
      dispatch(loaderPatch(false))
    })
    .catch(function (error: any) {
      console.log(error);
    });
}

export function fetchEmployeeById(id: (number | string)) {

  return axios.get(`api/employees/${id}?populate=*`, config)
    .then(function (response: any) {
      console.log(response.data.data);
      return response.data.data
    })
    .catch(function (error: any) {
      console.log(error);
    });
}

export function fetchTasksById(id: (number | string)) {

  return axios.get(`api/tasks/${id}?populate=*`, config)
    .then(function (response: any) {
      console.log(response.data.data);
      return response.data.data
    })
    .catch(function (error: any) {
      console.log(error);
    });
}
interface Task {
  assignee: string;
  date: string;
  description: string;
  title: string;
}
export function createTask(dispatch:  Dispatch<AnyAction>, data: Task) {
  dispatch(loaderPatch(true))
  axios
    .post("api/tasks", data ,config)
    .then(function (response: any) {
      console.log(response.data.data);
      dispatch(updateInfo("Succ Created a Task !"))
      dispatch(loaderPatch(false))
    })
    .catch(function (error: any) {
      console.log(error);
      dispatch(loaderPatch(false))
    });
}
interface Employee {
  data: {
    birthdate: string;
    fullname: string;
    image: string;
    finishedTasks: {
      finished: any[];
    };
    salary: string;
    phonenumber: string;
    email: string;
    tasks: {
      tasks: any[];
    };
  };
}
export function createEmployee(dispatch:  Dispatch<AnyAction>, data: Employee, imageId: number) {
  dispatch(loaderPatch(true))
  axios
    .post("api/employees", {...data, image:imageId} ,config)
    .then(function (response: any) {
      console.log(response.data.data);
      dispatch(updateInfo("Succ Created a Employee !"))
      dispatch(loaderPatch(false))
    })
    .catch(function (error: any) {
      console.log(error);
      dispatch(loaderPatch(false))
    });
}


export function deleteTask(id: (number | string)) {

  return axios.delete(`api/tasks/${id}`, config)
    .then(function (response: any) {
      console.log(response.data.data);
      return response.data.data
    })
    .catch(function (error: any) {
      console.log(error);
    });
}

export function deleteEmployee(id: (number | string)) {

  return axios.delete(`api/employees/${id}`, config)
    .then(function (response: any) {
      console.log(response.data.data);
      return response.data.data
    })
    .catch(function (error: any) {
      console.log(error);
    });
}

export function updateEmployee(dispatch:  Dispatch<AnyAction>, data: Employee, id: number) {
  dispatch(loaderPatch(true))
  axios
    .put(`api/employees/${id}`, data ,config)
    .then(function (response: any) {
      console.log(response.data.data);
      dispatch(loaderPatch(false))
    })
    .catch(function (error: any) {
      console.log(error);
      dispatch(loaderPatch(false))
    });
}

export function updateTask(dispatch:  Dispatch<AnyAction>, data: Employee, id: number) {
  dispatch(loaderPatch(true))
  axios
    .put(`api/tasks/${id}`, data ,config)
    .then(function (response: any) {
      console.log(response.data.data);
      dispatch(loaderPatch(false))
    })
    .catch(function (error: any) {
      console.log(error);
      dispatch(loaderPatch(false))
    });
}