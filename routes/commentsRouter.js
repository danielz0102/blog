import { Router } from 'express'
import { CommentsController } from '#controllers/CommentsController.js'
import { verifyToken } from '#middlewares/verifyToken.js'

export const commentsRouter = Router()

commentsRouter.post('/', verifyToken, CommentsController.create)
commentsRouter.put('/:id', verifyToken, CommentsController.update)
commentsRouter.delete('/:id', verifyToken, CommentsController.remove)
