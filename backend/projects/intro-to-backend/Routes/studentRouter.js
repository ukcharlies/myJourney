const express = require("express");
const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
} = require("../controllers/studentController");
const router = express.Router();

// A route to get all students
router.get("/", getAllStudents);
// A route to get a student by id
router.get("/:id", getStudentById);

// router.post("/", (req, res) => {
//   res.json("DATA POSTED");
// });

router.post("/data", (req, res) => {
  res.json("DATA page");
});

// a route to create a student
router.post("/", createStudent);

// a route to update a student
router.patch("/:id", updateStudent);
module.exports = router;
