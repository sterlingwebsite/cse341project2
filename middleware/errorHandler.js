const errorHandler = (err, req, res, next) => {
  console.error("Captured App Error:", err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || "Internal Server Error occurred.",
    },
  });
};

module.exports = { errorHandler };
