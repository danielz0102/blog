import z from 'zod'
import { formatZodError } from '#lib/formatZodError.js'

export const validateRequest =
  (schema, validateParamId = false) =>
  (req, res, next) => {
    const result = schema.safeParse(req.body)

    if (validateParamId) {
      const { id } = req.params
      const idValidationResult = z.string().uuid().safeParse(id)

      if (!idValidationResult.success) {
        return res
          .status(400)
          .json({ error: 'The param ID must be a valid UUID' })
      }
    }

    if (!result.success) {
      return res.status(400).json({ errors: formatZodError(result.error) })
    }

    req.body = result.data
    next()
  }
