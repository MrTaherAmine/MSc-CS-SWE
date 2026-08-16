function notFound(req, res) {
  res.status(404).json({
    error: "Route not found"
  });
}

function errorHandler(error, req, res, next) {
  console.error(error);

  if (error.name === "ValidationError") {
    return res.status(400).json({
      error: "Validation failed",
      details: Object.values(error.errors).map((item) => item.message)
    });
  }

  if (error.name === "CastError") {
    return res.status(400).json({
      error: "Invalid product id"
    });
  }

  res.status(error.statusCode || 500).json({
    error: error.message || "Internal server error"
  });
}

module.exports = {
  notFound,
  errorHandler
};
