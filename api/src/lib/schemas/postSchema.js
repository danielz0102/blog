import z from 'zod/v4'

export const postSchema = z.object({
  title: z.string().nonempty(),
  content: z.string().nonempty(),
  isDraft: z.boolean().default(false)
})

export const querySchema = z.object({
  limit: z.coerce
    .number('Must be a positive number')
    .positive('Must be a positive number')
    .optional(),
  title: z.string().nonempty().optional()
})

export const searchSchema = querySchema.extend({
  createdAt: z.iso.date().optional(),
  startDate: z.iso.date().optional(),
  endDate: z.iso.date().optional(),
  onlyDraft: z.coerce.boolean().default(undefined)
})
