export class ApiError extends Error {
  constructor(message, statusCode, data) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
    this.data = data
  }
}
