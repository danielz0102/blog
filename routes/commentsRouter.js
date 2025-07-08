import { Router } from 'express'
import { CommentsController } from '#controllers/CommentsController.js'
import { verifyToken } from '#middlewares/verifyToken.js'
import { validateRequest } from '#middlewares/validateRequest.js'
import { commentSchema } from '#lib/schemas/commentSchema.js'

export const commentsRouter = Router()

commentsRouter.post(
  '/',
  verifyToken,
  validateRequest({ schema: commentSchema }),
  CommentsController.create,
)
commentsRouter.put(
  '/:id',
  verifyToken,
  validateRequest({
    schema: commentSchema.omit({ postId: true }),
    hasIdParam: true,
  }),
  CommentsController.update,
)
commentsRouter.delete(
  '/:id',
  verifyToken,
  validateRequest({ hasIdParam: true }),
  CommentsController.remove,
)
