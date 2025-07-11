import { flattenError } from 'zod/v4'

export const validateRequest =
  ({ bodySchema = null, paramsSchema = null, querySchema = null }) =>
  (req, res, next) => {
    const schemas = []

    if (bodySchema) {
      schemas.push({ type: 'body', schema: bodySchema })
    }

    if (paramsSchema) {
      schemas.push({ type: 'params', schema: paramsSchema })
    }

    if (querySchema) {
      schemas.push({ type: 'query', schema: querySchema })
    }

    const { errors, data } = schemas.reduce(
      (result, { type, schema }) => {
        const validation = schema.safeParse(req[type])

        if (!validation.success) {
          result.errors[type] = flattenError(validation.error).fieldErrors
          return result
        }

        result.data[type] = validation.data
        return result
      },
      { errors: {}, data: {} },
    )

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors })
    }

    Object.keys(data).forEach((key) => {
      // req.query is read-only
      if (key !== 'query') {
        req[key] = data[key]
      }
    })

    next()
  }
