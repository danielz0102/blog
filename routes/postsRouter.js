import { Router } from 'express'

import { PostsController } from '#controllers/PostsController.js'

import { validateRequest } from '#middlewares/validateRequest.js'
import { onlyAdmin } from '#middlewares/onlyAdmin.js'

import { postSchema } from '#lib/schemas/postSchema.js'
import { querySchema } from '#lib/schemas/postSchema.js'
import { paramsSchema } from '#lib/schemas/commonSchemas.js'

export const postsRouter = Router()

postsRouter.get('/', validateRequest({ querySchema }), PostsController.getAll)
postsRouter.get('/:id', validateRequest({ paramsSchema }), PostsController.get)
postsRouter.post(
  '/',
  onlyAdmin,
  validateRequest({ bodySchema: postSchema }),
  PostsController.create,
)
postsRouter.put(
  '/:id',
  onlyAdmin,
  validateRequest({ bodySchema: postSchema, paramsSchema }),
  PostsController.update,
)
postsRouter.delete(
  '/:id',
  onlyAdmin,
  validateRequest({ paramsSchema }),
  PostsController.delete,
)
