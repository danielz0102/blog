import z from 'zod'

export const commentSchema = z.object({
  content: z.string(),
  postId: z.string().uuid('Must be a valid UUID'),
})
