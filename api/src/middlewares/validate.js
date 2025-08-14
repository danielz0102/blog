export const validate =
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

    const isInvalid = schemas.some(({ schema, type }) => {
      const validation = schema.safeParse(req[type])
      return !validation.success
    })

    if (isInvalid) {
      return res.status(400).json({ error: 'The request validation failed' })
    }

    const data = schemas.reduce((result, { type, schema }) => {
      const validation = schema.parse(req[type])
      result[type] = validation.data
      return result
    }, {})

    for (const key in data) {
      // req.query is read-only
      if (key !== 'query') {
        req[key] = data[key]
      }
    }

    next()
  }
