require("dotenv").config(); //dotenv is imported to enable the use of the .env file
const express = require("express");
const studentRouter = require("./Routes/studentRouter");
const logger = require("./middlewares/Logger");
const error = require("./Routes/error");
const app = express(); //express is imported to make it a functional server

app.use(logger); //the logger middleware is used to log the request URL and method to the console
app.use(express.static("public")); //middleware to serve static files
app.use(express.json()); //middleware to parse json data

app.get("/", (req, res) => {
  res.json({
    msg: "Welcome to the Student API",
  });
}); // simple route to display something on the home route

app.get("/about", (req, res) => {
  res.json({
    msg: "about endpoint",
  });
});

app.use("/students", studentRouter);

app.use(error); //the error middleware is used to log the error message and stack trace to the console and sends a response to the client with the message "Something went wrong in the server"

const PORT = process.env.PORT || 5000; //the port is set to the port in the .env file or 5000 if the port is not specified
const AUTHOR = process.env.AUTHOR; //the author is set to the author in the .env file

app.listen(PORT, () => {
  console.log(`Server is running on
    http://localhost:${PORT}, Author: ${AUTHOR}`);
}); //server is started listening to the current port port sprcified displaying message when started
