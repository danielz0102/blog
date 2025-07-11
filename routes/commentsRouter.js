import { Router } from 'express'

import { CommentsController } from '#controllers/CommentsController.js'

import { verifyToken } from '#middlewares/verifyToken.js'
import { validateRequest } from '#middlewares/validateRequest.js'

import { commentSchema } from '#lib/schemas/commentSchema.js'
import { paramsSchema } from '#lib/schemas/commonSchemas.js'

export const commentsRouter = Router()

commentsRouter.post(
  '/',
  verifyToken,
  validateRequest({ bodySchema: commentSchema }),
  CommentsController.create,
)
commentsRouter.put(
  '/:id',
  verifyToken,
  validateRequest({
    bodySchema: commentSchema.omit({ postId: true }),
    paramsSchema,
  }),
  CommentsController.update,
)
commentsRouter.delete(
  '/:id',
  verifyToken,
  validateRequest({ paramsSchema }),
  CommentsController.remove,
)
