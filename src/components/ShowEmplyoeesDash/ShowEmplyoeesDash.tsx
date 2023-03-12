import { CheckIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Link } from "react-router-dom";
import Employees from "../../pages/Employees/Employees";
import { EmployeeInterface } from "../../redux/features/employeesSlice";
import { RootState } from "../../redux/store";

function ShowEmplyoeesDash() {
  const employees: EmployeeInterface[] = useSelector(
    (state: RootState) => state.employee.employees
  );
  return (
    <div className="bg-white shadow rounded-lg p-4 w-2/5">
      <h2 className="text-lg font-bold mb-2 text-gray-900">Employees</h2>
      <ul className="divide-y divide-gray-200">
        {employees.map((employee) => (
          <li
            key={employee.id}
            className="py-2 flex items-center justify-between"
          >
            <Link
              to={`/employees/${employee.id}`}
              className="flex items-center space-x-2"
            >
              <span className="font-medium text-gray-900">
                {employee.attributes.fullname}
              </span>
              <ChevronRightIcon className="h-5 w-5 text-gray-400" />
            </Link>
            <div className="w-2/6 text-blue-500 flex content-center items-center ">
              <p className=" w-4/6">
                Tasks done: {employee.attributes.finishedTasks.finished.length}
              </p>

              <div className="w-1/6">
                {" "}
                <CheckIcon />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShowEmplyoeesDash;
