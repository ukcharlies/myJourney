import React, { useState } from "react";

export const ControlledForm = () => {
  const [person, setPerson] = useState({ firstName: "", lastName: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setPerson((person) => ({
      ...person,
      [name]: value,
    }));
  }

  function submitHandler(e) {
    e.preventDefault();
    console.log(person);
  }

  return (
    <form
      onSubmit={submitHandler}
      style={{ display: "flex", flexDirection: "column", width: "200px" }}
    >
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={person.firstName}
          onChange={handleChange}
          style={{ display: "block", padding: "6px" }}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={person.lastName}
          onChange={handleChange}
          style={{ display: "block", padding: "6px" }}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
