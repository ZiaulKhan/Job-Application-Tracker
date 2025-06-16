const errorHandler = (err, req, res, next) => {
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      message: `${
        field.charAt(0).toUpperCase() + field.slice(1)
      } already exists`,
    });
  }

  if (err.name === "ZodError") {
    return res.status(400).json({
      message: err.errors.map((e) => e.message).join(", "),
    });
  }

  res.status(err.statusCode || 500).json({
    message: err.message || "Something went wrong",
  });
};

module.exports = errorHandler;
