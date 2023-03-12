import axios from "axios";
import React from "react";

import { useState } from "react";
import { Circles } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { config, createEmployee, createTask } from "../../fetch/fetch";
import { RootState } from "../../redux/store";
import token from "../../token";

function NewEmployee() {
  const [agreed, setAgreed] = useState(false);
  const dispatch = useDispatch();
  const info = useSelector((state: RootState) => state.task.info);
  const loader: boolean = useSelector((state: RootState) => state.task.loader);
  const [formData, setFormData] = useState({
    data: {
      birthdate: "",
      fullname: "",
      finishedTasks: {
        finished: [],
      },
      salary: "",
      phonenumber: "",
      email: "",
      tasks: {
        tasks: [],
      },
    },
  });

  const [files, setFiles] = useState<File[]>([]);

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFiles([selectedFile]);
    } else {
      setFiles([]);
    }
  };

  const handleImageSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (files.length > 0) {
      const formData2 = new FormData();
      formData2.append("files", files[0]);

      axios.post("api/upload", formData2, config).then((response) => {
        const imageId = response.data[0].id;
        console.log(imageId, formData2);

        createEmployee(dispatch, formData, imageId);
      });
    } else {
      console.log("No file selected");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    if (id === "finishedTasks") {
      setFormData((prevState) => ({
        ...prevState,
        data: {
          ...prevState.data,
          finishedTasks: {
            ...prevState.data.assignee,
            finished: [value],
          },
        },
      }));
    } else if (id === "tasks") {
      setFormData((prevState) => ({
        ...prevState,
        data: {
          ...prevState.data,
          tasks: {
            ...prevState.data.assignee,
            tasks: [value],
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

  const handleSubmit = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    console.log(formData);
    createEmployee(dispatch, formData);
  };
  return (
    <div className="isolate z-0 bg-white py-24 px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Create a employee
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Create a employee to work on tasks
        </p>
      </div>

      <form
        onSubmit={handleImageSubmit}
        className="mx-auto mt-16 max-w-xl sm:mt-20"
      >
        <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label
              htmlFor="fullname"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Fullname
            </label>
            <div className="mt-2.5">
              <input
                onChange={handleChange}
                type="text"
                name="fullname"
                id="fullname"
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
              Email
            </label>
            <div className="mt-2.5">
              <input
                onChange={handleChange}
                type="email"
                name="email"
                id="email"
                className="block w-full rounded-md border-0 py-2 px-3.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="birthdate"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Birth Date
            </label>
            <div className="relative mt-2.5">
              <input
                onChange={handleChange}
                type="date"
                name="birthdate"
                id="birthdate"
                className="block w-full rounded-md border-0 py-2 px-3.5  text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="salary"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Salary
            </label>
            <div className="mt-2.5">
              <input
                onChange={handleChange}
                name="salary"
                id="salary"
                type={"text"}
                className="block w-full rounded-md border-0 py-2 px-3.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={""}
              />
            </div>
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="assignee"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Finished Tasks (1,2,3,4)
          </label>
          <div className="mt-2.5">
            <input
              onChange={handleChange}
              type="text"
              name="finishedTasks"
              id="finishedTasks"
              className="block w-full rounded-md border-0 py-2 px-3.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="assignee"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Phone number
          </label>
          <div className="mt-2.5">
            <input
              onChange={handleChange}
              type="text"
              name="phonenumber"
              id="phonenumber"
              className="block w-full rounded-md border-0 py-2 px-3.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="assignee"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Tasks currently working on it (1,2,3,4)
          </label>
          <div className="mt-2.5">
            <input
              onChange={handleChange}
              type="text"
              name="tasks"
              id="tasks"
              className="block w-full rounded-md border-0 py-2 px-3.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="mt-10">
          <button
            type="submit"
            disabled={info}
            className=" block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {info ? info : "     Create an Employee"}
          </button>

          <div className="text-black">
            <label htmlFor="image-upload">Upload an image:</label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
            />
          </div>
          <div></div>
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

export default NewEmployee;
