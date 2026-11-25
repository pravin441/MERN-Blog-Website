// An error with an HTTP status code, caught by our errorHandler middleware
export default class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message)
    this.statusCode = statusCode
  }
}