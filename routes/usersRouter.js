import { Router } from 'express'
import { UsersController } from '#controllers/UsersController.js'
import { validateUser } from '#middlewares/validateUser.js'

export const usersRouter = Router()

usersRouter.post('/login', validateUser, UsersController.login)
usersRouter.post('/sign-up', validateUser, UsersController.signUp)
