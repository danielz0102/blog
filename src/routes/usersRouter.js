import { Router } from 'express'

import { UsersController } from '#controllers/UsersController.js'

import { validate } from '#middlewares/validate.js'

import { userSchema } from '#lib/schemas/userSchema.js'

export const usersRouter = Router()

usersRouter.post(
  '/login',
  validate({ bodySchema: userSchema }),
  UsersController.login,
)
usersRouter.post(
  '/sign-up',
  validate({ bodySchema: userSchema }),
  UsersController.signUp,
)
