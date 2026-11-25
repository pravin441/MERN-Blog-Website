// Runs when no route matched the request
export function notFound(req, res, next) {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`)
  error.statusCode = 404
  next(error)
}

// Every error in the app ends up here, so all error responses look the same
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500

  res.status(statusCode).json({
    success: false,
    message: statusCode === 500 && process.env.NODE_ENV === 'production'
      ? 'Something went wrong on the server'
      : err.message,
    // Show the stack trace only while developing
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
}