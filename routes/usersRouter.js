import { Router } from 'express'

import { UsersController } from '#controllers/UsersController.js'

import { validateRequest } from '#middlewares/validateRequest.js'

import { userSchema } from '#lib/schemas/userSchema.js'

export const usersRouter = Router()

usersRouter.post(
  '/login',
  validateRequest({ bodySchema: userSchema }),
  UsersController.login,
)
usersRouter.post(
  '/sign-up',
  validateRequest({ bodySchema: userSchema }),
  UsersController.signUp,
)
