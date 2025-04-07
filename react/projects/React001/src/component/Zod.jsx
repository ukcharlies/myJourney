import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";

const schema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(2),
});

export const Zod = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

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
        {errors.firstName && (
          <p className=" text-red-600">{errors.firstName.message}</p>
        )}
      </label>
      <label>
        Last Name:
        <input
          type="text"
          {...register("lastName", { required: true, minLength: 3 })}
          style={{ display: "block", padding: "6px" }}
        />
        {errors.lastName && (
          <p className=" text-red-600">{errors.lastName.message}</p>
        )}
      </label>
      <button type="submit" className=" bg-slate-400 p-3">
        Submit
      </button>
    </form>
  );
};
