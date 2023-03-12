import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { EmployeeInterface } from "../../redux/features/employeesSlice";
import { TaskInterface } from "../../redux/features/taskSlice";
import { RootState } from "../../redux/store";

type Props = {};

function RecentTasks({}: Props) {
  const tasks: TaskInterface[] = useSelector(
    (state: RootState) => state.task.tasks
  );
  const employees: EmployeeInterface[] = useSelector(
    (state: RootState) => state.employee.employees
  );
  const [sortedTasks, setSortedTasks] = useState<TaskInterface[]>([]);

  const sortTasksByDate = () => {
    const sorted = [...tasks].sort((a, b) => {
      return +new Date(a.attributes.createdAt) - +new Date();
    });
    setSortedTasks(sorted);
  };

  useEffect(() => {
    sortTasksByDate();
  }, [tasks]);

  function numberOfFinished(id: number) {
    let num = 0;
    employees.forEach((employee: EmployeeInterface) => {
      if (employee.attributes.finishedTasks.finished.includes(id)) {
        num++;
      }
    });
    return num;
  }
  return (
    <div className="bg-white shadow rounded-lg p-4 w-2/5">
      <h2 className="text-lg font-bold mb-2 text-gray-900">Recent Tasks</h2>
      <ul className="divide-y divide-gray-200">
        {sortedTasks.map((task) => (
          <li key={task.id} className="py-2">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-900">
                {task.attributes.Title}
              </span>
              <span className="text-sm font-light text-gray-900">
                {task.attributes.assignee.employee.length} employees
              </span>
              <span
                className={`${
                  task.attributes.assignee.employee.length ===
                  numberOfFinished(task.id)
                    ? "bg-green-500"
                    : "bg-gray-500"
                } text-white py-1 px-2 rounded-full text-xs`}
              >
                {task.attributes.assignee.employee.length !==
                numberOfFinished(task.id)
                  ? "Open"
                  : "Done"}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentTasks;
