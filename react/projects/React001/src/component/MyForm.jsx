import React, { useRef } from "react";

export const MyForm = () => {
  const person = { firstName: "", lastName: "" };
  const fName = useRef(null);
  const lName = useRef(null);

  function submitHandler(e) {
    e.preventDefault();
    if (fName.current.value === "" || lName.current.value === "") {
      alert("Please fill in all fields");
    }
    if (fName.current.value !== null && lName.current.value !== null) {
      person.firstName = fName.current.value;
      person.lastName = lName.current.value;
      console.log(person);
    }
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
          ref={fName}
          style={{
            display: "block",
            padding: "6px",
            backgroundColor: "lightblue",
            marginBottom: "10px",
          }}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          ref={lName}
          style={{
            display: "block",
            padding: "6px",
            marginBottom: "10px",
            backgroundColor: "lightblue",
          }}
        />
      </label>
      <input
        type="submit"
        value="Submit"
        style={{
          display: "block",
          marginTop: "10px",
          padding: "10px",
          backgroundColor: "yellow",
        }}
      />
    </form>
  );
};
