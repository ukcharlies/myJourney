const error = (err, req, res, next) => {
  if (err) {
    console.log("======== Error Message ========");

    console.error(err.message);
    console.log("======== Error Stack ========");
    console.error(err.stack);

    res.send("Something went wrong in the server");
  }
  next();
};
module.exports = error;
// The error middleware function logs the error message and stack trace to the console and sends a response to the client with the message "Something went wrong in the server". The error middleware function is exported to be used in the server.js file.
