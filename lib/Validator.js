import z from 'zod'
import { flattenError } from 'zod/v4'

export class Validator {
  constructor(schema) {
    this.schema = schema
    this.errors = []
    this.data = null
  }

  validateData(data) {
    const result = this.schema.safeParse(data)

    if (!result.success) {
      this.errors.push(flattenError(result.error).fieldErrors)
      return
    }

    this.data = result.data
  }

  validateUUID(id) {
    const idResult = z.string().uuid().safeParse(id)

    if (!idResult.success) {
      this.errors.push({ id: flattenError(idResult.error).formErrors })
    }
  }

  isValid() {
    return this.errors.length === 0
  }
}
