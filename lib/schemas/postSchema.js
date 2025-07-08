import z from 'zod'

export const postSchema = z.object({
  title: z.string().nonempty(),
  content: z.string().nonempty(),
  isDraft: z.boolean(),
})
