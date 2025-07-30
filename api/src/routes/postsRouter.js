import { Router } from 'express'

import { PostsController } from '#controllers/PostsController.js'

import { validate } from '#middlewares/validate.js'
import { onlyAdmin } from '#middlewares/onlyAdmin.js'

import { postSchema } from '#lib/schemas/postSchema.js'
import { querySchema } from '#lib/schemas/postSchema.js'
import { paramsSchema } from '#lib/schemas/commonSchemas.js'

export const postsRouter = Router()

postsRouter.get('/', validate({ querySchema }), PostsController.getAll)
postsRouter.get(
  '/drafts',
  onlyAdmin,
  validate({ querySchema }),
  PostsController.getDrafts
)
postsRouter.get('/:id', validate({ paramsSchema }), PostsController.get)
postsRouter.post(
  '/',
  onlyAdmin,
  validate({ bodySchema: postSchema }),
  PostsController.create
)
postsRouter.put(
  '/:id',
  onlyAdmin,
  validate({ bodySchema: postSchema, paramsSchema }),
  PostsController.update
)
postsRouter.delete(
  '/:id',
  onlyAdmin,
  validate({ paramsSchema }),
  PostsController.delete
)
