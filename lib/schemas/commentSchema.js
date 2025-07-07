import z from 'zod'

export const commentSchema = z.object({
  content: z.string(),
  postId: z.string().uuid('Post ID must be a valid UUID'),
})
