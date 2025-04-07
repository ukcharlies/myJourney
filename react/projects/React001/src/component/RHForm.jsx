import React from "react";
import { useForm } from "react-hook-form";

export const RHForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function registerHandler(data) {
    console.log("The Data here:", data);
  }
  return (
    <form onSubmit={handleSubmit(registerHandler)}>
      <label>
        First Name:
        <input
          type="text"
          {...register("firstName", { required: true, minLength: 3 })}
          style={{ display: "block", padding: "6px" }}
        />
        {errors.firstName?.type === "required" && (
          <p className=" text-red-600">Name is required</p>
        )}
        {errors.firstName?.type === "minLength" && (
          <p className=" text-red-600">Name is too short</p>
        )}
      </label>
      <label>
        Last Name:
        <input
          type="text"
          {...register("lastName", { required: true, minLength: 3 })}
          style={{ display: "block", padding: "6px" }}
        />
        {errors.lastName?.type === "required" && (
          <p className=" text-red-600">Name is required</p>
        )}
        {errors.lastName?.type === "minLength" && (
          <p className=" text-red-600">Name is too short</p>
        )}
      </label>
      <button type="submit" className=" bg-slate-400 p-3">
        Submit
      </button>
    </form>
  );
};
