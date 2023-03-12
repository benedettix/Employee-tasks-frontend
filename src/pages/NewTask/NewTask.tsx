import React from "react";

import { useState } from "react";
import { Circles } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../../fetch/fetch";
import { RootState } from "../../redux/store";

function NewTask() {
  const [agreed, setAgreed] = useState(false);
  const dispatch = useDispatch();
  const info = useSelector((state: RootState) => state.task.info);
  const loader: boolean = useSelector((state: RootState) => state.task.loader);
  const [formData, setFormData] = useState({
    data: {
      Title: "",
      assignee: {
        employee: [],
      },
      duedate: "",
      Description: "",
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    if (id === "assignee") {
      setFormData((prevState) => ({
        ...prevState,
        data: {
          ...prevState.data,
          assignee: {
            ...prevState.data.assignee,
            employee: [value],
          },
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        data: {
          ...prevState.data,
          [id]: value,
        },
      }));
    }
  };

  const handleChangeTextArea: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    const { id, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      data: {
        ...prevState.data,
        [id]: value,
      },
    }));
  };

  const handleSubmit = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    console.log(formData);
    createTask(dispatch, formData);
  };
  return (
    <div className="isolate z-0 bg-white py-24 px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Create a task
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Create a task to employees work on it
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label
              htmlFor="title"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Title
            </label>
            <div className="mt-2.5">
              <input
                onChange={handleChange}
                type="text"
                name="title"
                id="Title"
                autoComplete="organization"
                className="block w-full rounded-md border-0 py-2 px-3.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="assignee"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Assignee (employee id: 1, 2, 3 ,4...)
            </label>
            <div className="mt-2.5">
              <input
                onChange={handleChange}
                type="number"
                name="assignee"
                id="assignee"
                className="block w-full rounded-md border-0 py-2 px-3.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="date"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Due Date
            </label>
            <div className="relative mt-2.5">
              <input
                onChange={handleChange}
                type="date"
                name="date"
                id="duedate"
                autoComplete="tel"
                className="block w-full rounded-md border-0 py-2 px-3.5  text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="description"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Description
            </label>
            <div className="mt-2.5">
              <textarea
                onChange={handleChangeTextArea}
                name="description"
                id="Description"
                rows={4}
                className="block w-full rounded-md border-0 py-2 px-3.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={""}
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            disabled={info}
            className=" block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {info ? info : "     Create a task"}
          </button>
          {loader && (
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
        </div>
      </form>
    </div>
  );
}

export default NewTask;
