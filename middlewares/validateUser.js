import { userSchema } from '#lib/schemas/userSchema.js'
import { formatZodError } from '#lib/formatZodError.js'

export function validateUser(req, res, next) {
  const result = userSchema.safeParse(req.body)

  if (!result.success) {
    return res.status(400).json({ errors: formatZodError(result.error) })
  }

  req.body = result.data

  next()
}
