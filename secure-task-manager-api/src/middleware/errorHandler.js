function errorHandler(error, req, res, next) {
  const statusCode = error.statusCode || 500;
  const status = error.status || "error";

  if (process.env.NODE_ENV !== "production") {
    return res.status(statusCode).json({
      status,
      message: error.message,
      stack: error.stack
    });
  }

  if (error.isOperational) {
    return res.status(statusCode).json({
      status,
      message: error.message
    });
  }

  console.error(error);

  return res.status(500).json({
    status: "error",
    message: "Something went wrong."
  });
}

module.exports = errorHandler;
