import React from "react";
import { Circles } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Task from "../../components/Task/Task";
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

function Tasks() {
  const tasks: TaskInterface[] = useSelector(
    (state: RootState) => state.task.tasks
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
          {" "}
          <header className="bg-white shadow">
            <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Tasks
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
                    to={"/newtask"}
                    type="button"
                    className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    New Task
                  </Link>
                </div>
                <div className="block bg-white shadow m-3">
                  <h3 className="text-1xl font-bold tracking-tight text-gray-900 m-5 ">
                    Task list: {tasks.length}
                  </h3>
                  <div className="flex m-5 pl-3">
                    <p className=" text-1xl font-bold tracking-tight text-gray-800  w-5/6   h-full">
                      Title
                    </p>

                    <p className=" text-1xl font-bold tracking-tight text-gray-800  w-2/6   h-full">
                      Status
                    </p>

                    <p className=" text-1xl font-bold tracking-tight text-gray-800  w-2/6   h-full">
                      Description
                    </p>

                    <p className=" text-1xl font-bold tracking-tight text-gray-800  w-2/6   h-full">
                      Due Date
                    </p>

                    <p className=" text-1xl font-bold tracking-tight text-gray-800  w-2/6   h-full">
                      Employees
                    </p>
                  </div>
                  {tasks?.map((task: TaskInterface) => (
                    <Task key={task.id} {...task} />
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

export default Tasks;
