import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmployeeInterface } from "../../redux/features/employeesSlice";

function Employee({ id, attributes }: EmployeeInterface) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/employees/" + id)}
      className="border-b-4 border-blue-200 bg-gray-100 hover:bg-gray-200 shadow rounded flex m-5 items-center content-center h-14 cursor-pointer"
    >
      <div className="w-1/5 border-r-2 border-blue-200 h-full flex justify-center items-center">
        <div className="ml-2 flex justify-center items-center h-full">
          <img
            className="rounded-full w-8 h-8"
            src={
              "http://localhost:1337" + attributes?.image?.data?.attributes?.url
            }
            alt="img"
          />
        </div>
        <p className="text-1xl font-bold tracking-tight text-gray-800 p-3">
          {attributes.fullname}
        </p>
      </div>

      <div className="w-2/6 border-r-2 border-blue-200 h-full flex">
        <p className=" text-1xl font-bold tracking-tight text-gray-800 p-3 ">
          {attributes.email}
        </p>
      </div>
      <div className=" border-r-2 border-blue-200 w-1/6 h-full">
        <div className="flex align-center content-center ml-3 h-full">
          <span className="text-1xl  font-bold  text-blue-500  self-center">
            {attributes.phonenumber}
          </span>
        </div>
      </div>
      <div className=" border-r-2 border-blue-200 w-1/6 h-full">
        <p className="text-1xl font-bold tracking-tight text-gray-800 p-3 ">
          {attributes.birthdate}
        </p>
      </div>
      <div className=" w-1/6 flex">
        <p className=" text-1xl font-bold tracking-tight text-gray-800 p-3 ">
          $ {attributes.salary}
        </p>
      </div>
    </div>
  );
}

export default Employee;
