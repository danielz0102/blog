import { Router } from 'express'
import { UsersController } from '#controllers/UsersController.js'

export const usersRouter = Router()

usersRouter.post('/login', UsersController.login)
usersRouter.post('/sign-up', UsersController.signUp)
