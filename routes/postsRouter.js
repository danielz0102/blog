import { Router } from 'express'
import { PostsController } from '#controllers/PostsController.js'

export const postsRouter = Router()

postsRouter.get('/', PostsController.getAll)
postsRouter.get('/:id', PostsController.get)
