import "./App.css";

import Root from "./components/Root";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import Employees from "./pages/Employees/Employees";
import Tasks from "./pages/Tasks/Tasks";
import NewTask from "./pages/NewTask/NewTask";
import NewEmployee from "./pages/NewEployee/NewEmployee";
import { updateInfo } from "./redux/features/taskSlice";
import { useDispatch } from "react-redux";
import EmployeePage from "./pages/EmployeePage/EmployeePage";
import TasksPage from "./pages/TasksPage/TasksPage";
import EmployeeUpdate from "./pages/EmployeeUpdate/EmployeeUpdate";
import TaskUpdate from "./pages/TaskUpdate/TaskUpdate";

function App() {
  const dispatch = useDispatch();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route path="employees" element={<Employees />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="newtask" element={<NewTask />} />
        <Route path="newemployee" element={<NewEmployee />} />
        <Route path="employees/:id" element={<EmployeePage />} />
        <Route path="employees/:id/update/:id" element={<EmployeeUpdate />} />
        <Route path="tasks/:id" element={<TasksPage />} />
        <Route path="tasks/:id/update/:id" element={<TaskUpdate />} />

        {/* <Route path="contact" element={<Contact />} />
        <Route
          path="dashboard"
          element={<Dashboard />}
          loader={({ request }) =>
            fetch("/api/dashboard.json", {
              signal: request.signal,
            })
          }
        />
        <Route element={<AuthLayout />}>
          <Route
            path="login"
            element={<Login />}
            loader={redirectIfUser}
          />
          <Route path="logout" />
        </Route> */}
      </Route>
    )
  );

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
