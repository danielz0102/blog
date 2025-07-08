import { Router } from 'express'
import { UsersController } from '#controllers/UsersController.js'
import { userSchema } from '#lib/schemas/userSchema.js'
import { validateRequest } from '#middlewares/validateRequest.js'

export const usersRouter = Router()

usersRouter.post(
  '/login',
  validateRequest({ schema: userSchema }),
  UsersController.login,
)
usersRouter.post(
  '/sign-up',
  validateRequest({ schema: userSchema }),
  UsersController.signUp,
)
