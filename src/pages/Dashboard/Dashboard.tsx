import { CheckIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { EmployeeInterface } from "../../redux/features/employeesSlice";
import { TaskInterface } from "../../redux/features/taskSlice";
import { RootState } from "../../redux/store";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import ShowEmplyoeesDash from "../../components/ShowEmplyoeesDash/ShowEmplyoeesDash";
import RecentTasks from "../../components/RecentTasks/RecentTasks";
import Top5 from "../../components/Top5/Top5";
import { Audio, Circles } from "react-loader-spinner";
ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const [openTasks, setOpenTasks] = useState<number>(0);
  const [doneTasks, setDoneTasks] = useState<number>(0);

  const employees: EmployeeInterface[] = useSelector(
    (state: RootState) => state.employee.employees
  );
  const tasks: TaskInterface[] = useSelector(
    (state: RootState) => state.task.tasks
  );

  function numberOfFinished(id: number) {
    let num = 0;
    employees?.forEach((employee: EmployeeInterface) => {
      if (employee.attributes.finishedTasks.finished.includes(id)) {
        num++;
      }
    });
    return num;
  }

  useEffect(() => {
    let openTasks = 0;
    let doneTasks = 0;
    tasks.forEach((task) => {
      if (
        task.attributes.assignee.employee.length !== numberOfFinished(task.id)
      ) {
        openTasks++;
      } else {
        doneTasks++;
      }
    });

    setOpenTasks(openTasks);
    setDoneTasks(doneTasks);
  }, [tasks, employees]);

  const data = {
    labels: ["Open", "Done"],
    datasets: [
      {
        label: "# of Votes",
        data: [openTasks, doneTasks],
        backgroundColor: ["	rgba(160,160,160,0.2)", " rgba(38, 194, 129, 0.2)"],
        borderColor: ["	rgba(211,211,211,1)", " rgba(38, 194, 129, 1)"],
        borderWidth: 1,
      },
    ],
  };
  const loader: boolean = useSelector((state: RootState) => state.task.loader);
  return (
    <>
      {!loader ? (
        <div className="flex  gap-4 p-4 w-full flex-wrap justify-center ">
          <ShowEmplyoeesDash />

          <RecentTasks />

          <div className="bg-white shadow rounded-lg p-4 w-2/5 flex content-center items-center flex-col">
            <h2 className="text-lg font-bold mb-2 text-gray-900">
              Project Task Status
            </h2>
            <Pie data={data} />
          </div>

          <Top5 />
        </div>
      ) : (
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
      )}
    </>
  );
}

export default Dashboard;
