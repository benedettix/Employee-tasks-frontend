import { PaperClipIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {
  deleteTask,
  fetchEmployeeById,
  fetchTasksById,
  updateTask,
} from "../../fetch/fetch";
import { updateTasks } from "../../redux/features/taskSlice";

export default function TaskUpdate() {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);

  interface Task {
    assignee: string;
    date: string;
    description: string;
    title: string;
  }
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [assignee, setAssignee] = useState<string>("");
  const [duedate, setDueDate] = useState<string>("");
  useEffect(() => {
    fetchTasksById(id).then((task) => {
      setTask(task);
      setTitle(task?.attributes.Title || "");
      setDescription(task?.attributes.Description || "");
      setAssignee(task?.attributes.assignee.employee || "");
      setDueDate(task?.attributes.duedate || "");
    });
  }, [id]);

  const navigate = useNavigate();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleAssigneeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAssignee(e.target.value);
  };

  const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDueDate(e.target.value);
  };

  const dispatch = useDispatch();
  const handleSave = () => {
    const updatedEmployee = {
      data: {
        Title: title,
        assignee: {
          employee: [assignee],
        },
        duedate: duedate,
        Description: description,
      },
    };
    console.log(updatedEmployee);
    updateTask(dispatch, updatedEmployee, id);

    navigate(-1);
  };
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <button
        onClick={() => {
          navigate(-1);
        }}
        type="button"
        className=" text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Back
      </button>
      <button
        onClick={() => {
          handleSave();
        }}
        type="button"
        className=" text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Save
      </button>
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Task Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details</p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Title</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <input
                onChange={(e) => handleTitleChange(e)}
                className="rounded text-white p-3"
                type="text"
                value={title}
              />
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Employees working on it
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              User id:{" "}
              <input
                onChange={(e) => handleAssigneeChange(e)}
                className="rounded text-white p-3"
                type="text"
                value={assignee}
              />
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Due Date</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <input
                onChange={(e) => handleDueDateChange(e)}
                className="rounded text-white p-3"
                type="text"
                value={duedate}
              />
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Published At</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {task?.attributes.publishedAt}
            </dd>
          </div>

          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Description</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <input
                onChange={(e) => handleDescriptionChange(e)}
                className="rounded text-white p-3"
                type="text"
                value={description}
              />
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
