export class Result {
  constructor({ success = false, error = '', data = null }) {
    this.success = success
    this.error = error
    this.data = data
  }

  static success(data) {
    return new Result({ success: true, error: null, data })
  }

  static failure(error) {
    return new Result({ success: false, error, data: null })
  }
}
