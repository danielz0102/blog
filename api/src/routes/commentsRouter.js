import { Router } from 'express'

import { CommentsController } from '#controllers/CommentsController.js'

import { verifyToken } from '#middlewares/verifyToken.js'
import { validate } from '#middlewares/validate.js'

import { commentSchema } from '#lib/schemas/commentSchema.js'
import { paramsSchema } from '#lib/schemas/commonSchemas.js'

export const commentsRouter = Router()

commentsRouter.post(
  '/',
  verifyToken,
  validate({ bodySchema: commentSchema }),
  CommentsController.create
)
commentsRouter.put(
  '/:id',
  verifyToken,
  validate({
    bodySchema: commentSchema.omit({ postId: true }),
    paramsSchema
  }),
  CommentsController.update
)
commentsRouter.delete(
  '/:id',
  verifyToken,
  validate({ paramsSchema }),
  CommentsController.remove
)
