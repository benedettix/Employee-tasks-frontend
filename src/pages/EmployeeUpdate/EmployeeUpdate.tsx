import { PaperClipIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteEmployee,
  deleteTask,
  fetchEmployeeById,
  updateEmployee,
} from "../../fetch/fetch";

export default function EmployeeUpdate() {
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [fullName, setFullName] = useState("");
  const [finishedTasks, setFinishedTasks] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthdate, setBirthDate] = useState("");
  const [tasks, setTasks] = useState("");

  interface Employee {
    data: {
      birthdate: string;
      fullname: string;
      image: string;
      finishedTasks: {
        finished: any[];
      };
      salary: string;
      phonenumber: string;
      email: string;
      tasks: {
        tasks: any[];
      };
    };
  }

  useEffect(() => {
    fetchEmployeeById(id).then((employee) => {
      setEmployee(employee);
      setFullName(employee?.attributes.fullname || "");
      setFinishedTasks(employee?.attributes.finishedTasks.finished || "");
      setEmail(employee?.attributes.email || "");
      setSalary(employee?.attributes.salary || "");
      setPhoneNumber(employee?.attributes.phonenumber || "");
      setBirthDate(employee?.attributes.birthdate || "");
      setTasks(employee?.attributes.tasks.tasks || "");
    });
  }, [id]);

  const navigate = useNavigate();

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };

  const handleFinishedTasksChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFinishedTasks(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSalary(e.target.value);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthDate(e.target.value);
  };

  const handleTasksChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTasks(e.target.value);
  };
  const dispatch = useDispatch();
  const handleSave = () => {
    const updatedEmployee = {
      data: {
        fullname: fullName,
        finishedTasks: {
          finished: [finishedTasks],
        },
        email: email,
        salary: salary,
        phonenumber: phoneNumber,
        birthdate: birthdate,
        tasks: {
          tasks: [finishedTasks],
        },
      },
    };
    console.log(updatedEmployee);
    updateEmployee(dispatch, updatedEmployee, id);

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
          Employee Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details</p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Full name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <input
                onChange={(e) => handleFullNameChange(e)}
                className="rounded text-white p-3"
                type="text"
                value={fullName}
              />
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Finished Tasks
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              Tasks id:
              <input
                onChange={(e) => handleFinishedTasksChange(e)}
                className="rounded text-white p-3"
                type="text"
                value={finishedTasks}
              />
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Email address</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <input
                onChange={(e) => handleEmailChange(e)}
                className="rounded text-white p-3"
                type="text"
                value={email}
              />
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Salary</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              $
              <input
                onChange={(e) => handleSalaryChange(e)}
                className="rounded text-white p-3"
                type="text"
                value={salary}
              />
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <input
                onChange={(e) => handlePhoneNumberChange(e)}
                className="rounded text-white p-3"
                type="text"
                value={phoneNumber}
              />
            </dd>
          </div>

          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Birth Date</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <input
                onChange={(e) => handleBirthDateChange(e)}
                className="rounded text-white p-3"
                type="text"
                value={birthdate}
              />
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Tasks currently working on
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              Tasks id:
              <input
                onChange={(e) => handleTasksChange(e)}
                className="rounded text-white p-3"
                type="text"
                value={tasks}
              />
            </dd>
          </div>

          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Profile picture
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 w-64">
              <img
                src={
                  "http://localhost:1337" +
                  employee?.attributes?.image?.data?.attributes?.url
                }
                alt=""
              />
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
