import z from 'zod/v4'

export class Validator {
  constructor(schema) {
    this.schema = schema
    this.errors = {}
    this.data = null
  }

  validateData(data) {
    if (!data) {
      this.errors.data = 'There is no data'
      return
    }

    const result = this.schema.safeParse(data)

    if (!result.success) {
      this.errors = {
        ...this.errors,
        ...z.flattenError(result.error).fieldErrors,
      }
      return
    }

    this.data = result.data
  }

  validateUUID(id) {
    const idResult = z.uuid().safeParse(id)

    if (!idResult.success) {
      this.errors.id = z.flattenError(idResult.error).formErrors
    }
  }

  isValid() {
    return Object.keys(this.errors).length === 0
  }
}
