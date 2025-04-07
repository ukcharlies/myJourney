import React, { useState } from "react";

export const Students = () => {
  //   const [students, setStudents] = useState(["Kelvin", "Inioluwa", "Tobi"]);
  const [students, setStudents] = useState([
    { id: 1, name: "Kelvin Omolade", age: 16 },
    { id: 2, name: "Inioluwa Olatunji", age: 20 },
    { id: 3, name: "Tobi Adewumi", age: 19 },
  ]);

  const studentsHandler = () => {
    // Add
    // const newStuds = [...students, "Simi"];
    const newStuds = [
      ...students,
      { id: 4, name: "Dadeowo Similoluwa", age: 18 },
    ];
    setStudents(newStuds);

    // Remove
    // setStudents(students.filter((item) => item !== "Tobi"));
    // setStudents(students.filter((item) => item.id !== 3));
    // setStudents(students.filter((item) => item.name !== "Tobi Adewumi"));
    // Update
    // setStudents(students.map((item) => (item === "Tobi" ? "Tobiloba" : item)));
    // setStudents(
    //   students.map((item) =>
    //     item.id === 3 ? { ...item, name: "Tobiloba Adewumi" } : item
    //   )
    // );
  };
  return (
    <>
      <h1 className="text-xl font-bold">Students</h1>
      <ul>
        {students.map((item) => (
          <li>
            {item.id} - {item.name} - {item.age}
          </li>
        ))}
      </ul>
      <button onClick={studentsHandler} className=" p-2 bg-lime-400">
        Update Student
      </button>
    </>
  );
};
