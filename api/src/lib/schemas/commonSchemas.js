import z from 'zod/v4'

export const idSchema = z.uuid('Must be a valid UUID')

export const paramsSchema = z.object({
  id: idSchema
})
