import React from "react";
import ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";
import Root from "./components/Root";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  createRoutesFromElements,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import App from "./App";

import { store } from "./redux/store";
import { Provider } from "react-redux";

const container = document.getElementById("root");
const root = createRoot(container as HTMLElement);

root.render(
  <>
    <Provider store={store}>
      <App />
    </Provider>
  </>
);
