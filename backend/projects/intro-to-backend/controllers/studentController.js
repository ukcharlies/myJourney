const { Response, Request } = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
// const students = [
//   { id: 1, name: "6ix", age: 20 },
//   { id: 2, name: "Jizz", age: 20 },
//   { id: 3, name: "Bigz", age: 20 },
//   { id: 4, name: "Stigz", age: 15 },
// ];
/**
 *
 * @param {Request} req
 * @param {Reponse} res
 */

// All students
const getAllStudents = async (req, res, next) => {
  //basic about endpoint
  // try {
  //   let filteredStudents = students;

  //   if (req.query.age) {
  //     filteredStudents = filteredStudents.filter(
  //       (u) => u.age === parseInt(req.query.age)
  //     );
  //   }

  //   if (req.query.name) {
  //     filteredStudents = filteredStudents.filter(
  //       (u) => u.name.toLowerCase() === req.query.name.toLowerCase()
  //     );
  //   }

  //   res.json(filteredStudents);
  // } catch (error) {
  //   console.error(error.message);
  //   res
  //     .status(500)
  //     .json({ error: "An error occurred while fetching students" });
  // }

  try {
    const students = await prisma.student.findMany();

    res.json(students);
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {Request} req
 * @param {Reponse} res
 */

// A student
const getStudentById = (req, res, next) => {
  //we using the try catch cause we want to be able to responsed to errors appropriately and not just crash the server....this is a manual way of doing it
  // try {
  //   const theID = parseInt(req.params.id);
  //   //usage of parseint is due to the fact that the the id gotten from the use.param ois normally in the string form so we need to covert it
  //   console.log(typeof theID);
  //   const theStudent = students.find((u) => u.id === theID);
  //   if (!theStudent) {
  //     return res.status(400).json({ error: "No student withthe provided id" });
  //   }
  //   res.json(theStudent);
  // } catch (error) {
  //   console.error(error.message);
  // }

  //using the prisma to get a student by id
  try {
    const { id } = req.params;
    const student = prisma.student.findUnique({
      where: {
        id: id,
      },
    });

    res.json(student);
  } catch (error) {
    next(error);
  }
};
/**
 * 
 * @param {Request} req 
 * @param {Response} res 
  
 */
const createStudent = async (req, res, next) => {
  try {
    const { email, firstName, lastName } = req.body;
    const newStudent = await prisma.student.create({
      data: {
        email,
        firstName,
        lastName,
      },
    });

    res.json(newStudent);
  } catch (error) {
    next(error);
  }
};

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
  
 */
//update a student
const updateStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, firstName, lastName } = req.body;
    const updatedStudent = await prisma.student.update({
      where: {
        id: id,
      },
      data: {
        email,
        firstName,
        lastName,
      },
    });
    res.json(updatedStudent);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
};
