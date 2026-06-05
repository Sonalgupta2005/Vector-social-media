const errorHandler = (err, req, res, _next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: statusCode === 500
      ? "Server error"
      : err.message,
  });
};

export default errorHandler;