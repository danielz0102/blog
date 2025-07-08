import { Validator } from '#lib/Validator.js'

export const validateRequest =
  ({ schema = null, hasIdParam = false }) =>
  (req, res, next) => {
    const validator = new Validator(schema)

    if (schema) {
      validator.validateData(req.body)
    }

    if (hasIdParam) {
      validator.validateUUID(req.params.id)
    }

    if (!validator.isValid()) {
      return res.status(400).json({ errors: validator.errors })
    }

    req.body = validator.data
    next()
  }
