// This file contains a middleware function that logs the request URL and method to the console
const logger = (req, res, next) => {
  console.log(`Request URL: ${req.url}, Method: ${req.method}`);
  next();
};

module.exports = logger; //export the logger function to be used in the server.js file
