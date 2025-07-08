import z from 'zod/v4'

export const commentSchema = z.object({
  content: z.string(),
  postId: z.uuid('Must be a valid UUID'),
})
