import { Router } from 'express'
import { PostsController } from '#controllers/PostsController.js'
import { validateRequest } from '#middlewares/validateRequest.js'

export const postsRouter = Router()

postsRouter.get('/', PostsController.getAll)
postsRouter.get(
  '/:id',
  validateRequest({ hasIdParam: true }),
  PostsController.get,
)
