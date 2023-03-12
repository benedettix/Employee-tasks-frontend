import { CheckIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchEmployeeById } from "../../fetch/fetch";
import { EmployeeInterface } from "../../redux/features/employeesSlice";
import { RootState } from "../../redux/store";

interface TaskInterface {
  id: number;
  attributes: {
    Title: string;
    Description: string;
    assignee: object;
    duedate: string;
    createdAt: string;
  };
}

function Task({ id, attributes }: TaskInterface) {
  const employees: EmployeeInterface[] = useSelector(
    (state: RootState) => state.employee.employees
  );
  const dispatch = useDispatch();

  function numberOfFinished(id: number) {
    let num = 0;
    employees.forEach((employee: EmployeeInterface) => {
      if (employee.attributes.finishedTasks.finished.includes(id)) {
        num++;
      }
    });
    return num;
  }

  const [employeeData, setEmployeeData] = useState<EmployeeInterface[]>([]);
  async function getUserImg() {
    try {
      setEmployeeData([]);
      const peopleIds = attributes.assignee.employee;
      console.log(peopleIds);

      // Check if there are any peopleIds to fetch employee data for
      if (peopleIds?.length) {
        // Fetch employee data for each person
        const employees = await Promise.all(
          peopleIds.map((id: number) => fetchEmployeeById(id))
        );
        // Update employeeData state with the fetched employee data
        setEmployeeData((prevData) => [...prevData, ...employees]);
        console.log(employeeData);
      }
    } catch (error) {
      console.log(error);
      // handle the error and return a default value
    }
  }

  useEffect(() => {
    getUserImg();
  }, []);
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => navigate(`${id}`)}
        className="border-b-4 border-blue-200 bg-gray-100 hover:bg-gray-200 shadow rounded flex m-5 items-center content-center h-14 cursor-pointer"
      >
        <p className=" text-1xl font-bold tracking-tight text-gray-800 p-3 w-2/6 border-r-2 border-blue-200 h-full">
          {attributes?.Title}
        </p>
        <div className="w-1/6 border-r-2 border-blue-200 h-full flex">
          {attributes?.assignee.employee.length !== numberOfFinished(id) ? (
            <div className="self-center  text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 mx-5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Open {numberOfFinished(id)} /{" "}
              {attributes?.assignee.employee.length}
            </div>
          ) : (
            <div className="self-center  text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 mx-5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Done {numberOfFinished(id)} /{" "}
              {attributes?.assignee.employee.length}
            </div>
          )}
        </div>
        <div className=" border-r-2 border-blue-200 w-1/6 h-full">
          <div className="flex align-center content-center ml-3 h-full">
            <span className="text-1xl  font-bold  text-blue-500  self-center">
              {attributes?.Description.slice(0, 14)}...
            </span>
          </div>
        </div>
        <div className=" border-r-2 border-blue-200 w-1/6 h-full">
          <p className="text-1xl font-bold tracking-tight text-gray-800 p-3 ">
            {attributes?.duedate}
          </p>
        </div>
        <div className=" w-1/6 flex">
          {employeeData?.map((img, key) => (
            <div className="ml-2" key={key}>
              <img
                className="rounded-full w-8 h-8"
                src={
                  "http://localhost:1337" +
                  img?.attributes?.image.data.attributes.url
                }
                alt="img"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Task;
