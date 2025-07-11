import z from 'zod/v4'

export const postSchema = z.object({
  title: z.string().nonempty(),
  content: z.string().nonempty(),
  isDraft: z.boolean().default(false),
})

export const querySchema = z.object({
  limit: z.coerce
    .number('Must be a positive number')
    .positive('Must be a positive number')
    .optional(),
})
