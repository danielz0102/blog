import { Router } from 'express'
import { PostsController } from '#controllers/PostsController.js'
import { postSchema } from '#lib/schemas/postSchema.js'

import { validateRequest } from '#middlewares/validateRequest.js'
import { onlyAdmin } from '#middlewares/onlyAdmin.js'

export const postsRouter = Router()

postsRouter.get('/', PostsController.getAll)
postsRouter.get(
  '/:id',
  validateRequest({ hasIdParam: true }),
  PostsController.get,
)
postsRouter.post(
  '/',
  onlyAdmin,
  validateRequest({ schema: postSchema }),
  PostsController.create,
)
postsRouter.put(
  '/:id',
  onlyAdmin,
  validateRequest({ schema: postSchema, hasIdParam: true }),
  PostsController.update,
)
postsRouter.delete(
  '/:id',
  onlyAdmin,
  validateRequest({ hasIdParam: true }),
  PostsController.delete,
)
