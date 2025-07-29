import z from 'zod/v4'
import { idSchema } from './commonSchemas.js'

export const commentSchema = z.object({
  content: z.string(),
  postId: idSchema,
})
