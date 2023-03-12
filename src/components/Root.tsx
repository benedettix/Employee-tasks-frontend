import React, { useEffect } from "react";
import axios from "axios";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import token from "../token";
import { Routes, Route, useParams } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import { fetchEmployees, fetchTasks } from "../fetch/fetch";
import { useDispatch } from "react-redux";
import { updateInfo } from "../redux/features/taskSlice";
type Props = {};

function Root({}: Props) {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    fetchEmployees(dispatch);
    fetchTasks(dispatch);
    dispatch(updateInfo(""));
  }, [pathname]);
  return (
    <>
      <Navbar />
      {pathname === "/" ? <Dashboard /> : null}

      <Outlet />
    </>
  );
}

export default Root;
