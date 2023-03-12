import React from "react";
import { Circles } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Employee from "../../components/Employee/Employee";
import { EmployeeInterface } from "../../redux/features/employeesSlice";
import { RootState } from "../../redux/store";

const CheckIcon = () => {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="text-1xl"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      ></path>
    </svg>
  );
};

type Props = {};

function Employees({}: Props) {
  const employees: EmployeeInterface[] = useSelector(
    (state: RootState) => state.employee.employees
  );

  const loader: boolean = useSelector((state: RootState) => state.task.loader);

  return (
    <>
      {loader ? (
        <div>
          {" "}
          <div className="w-full h-20">
            <Circles
              height="80"
              width="80"
              color="blue"
              ariaLabel="circles-loading"
              wrapperStyle={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
              wrapperClass=""
              visible={true}
            />
          </div>
        </div>
      ) : (
        <>
          <header className="bg-white shadow">
            <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Employees
              </h1>
            </div>
          </header>
          <main className="bg-white shadow h-screen">
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 ">
              <div className="  bg-gray-100 flex flex-col rounded p-6 ">
                <div className="ml-auto">
                  {" "}
                  {/* Add ml-auto class here */}
                  <Link
                    to={"/newemployee"}
                    type="button"
                    className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    New Employee
                  </Link>
                </div>
                <div className="block bg-white shadow m-3">
                  <h3 className="text-1xl font-bold tracking-tight text-gray-900 m-5">
                    Employees list: {employees.length}
                  </h3>
                  <div className="flex m-5 pl-3">
                    <p className=" text-1xl font-bold tracking-tight text-gray-800  w-3/6   h-full">
                      Name
                    </p>

                    <p className=" text-1xl font-bold tracking-tight text-gray-800  w-5/6   h-full">
                      Email
                    </p>

                    <p className=" text-1xl font-bold tracking-tight text-gray-800  w-2/6   h-full">
                      Number
                    </p>

                    <p className=" text-1xl font-bold tracking-tight text-gray-800  w-2/6   h-full">
                      Date Birth
                    </p>

                    <p className=" text-1xl font-bold tracking-tight text-gray-800  w-2/6   h-full">
                      Salary
                    </p>
                  </div>
                  {employees?.map((employee: EmployeeInterface) => (
                    <Employee key={employee.id} {...employee} />
                  ))}
                </div>
              </div>
            </div>
          </main>
        </>
      )}
    </>
  );
}

export default Employees;
