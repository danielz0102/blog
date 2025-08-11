import type { UserPayload } from '../env'
import { ADMIN_TOKEN_COOKIE } from '../consts'

import { API_URL } from 'astro:env/server'
import { defineAction } from 'astro:actions'
import { ActionError } from 'astro:actions'
import { z } from 'astro:schema'

import { jwtDecode } from 'jwt-decode'

export const server = {
  login: defineAction({
    input: z.object({ username: z.string(), password: z.string() }),
    accept: 'form',
    handler: async (input, ctx) => {
      const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      })

      if (!response.ok) {
        if (response.status === 401 || response.status === 400) {
          throw new ActionError({
            code: 'UNAUTHORIZED',
            message: 'Username or password is not valid',
          })
        }

        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Oops, something went wrong. Try it again later.',
        })
      }

      const data: { token: string } = await response.json()
      const decoded = jwtDecode<UserPayload>(data.token)

      if (!decoded.admin) {
        throw new ActionError({
          code: 'FORBIDDEN',
          message: 'You do not have permission to access this resource',
        })
      }

      const SEVEN_DAYS = 60 * 60 * 1000 * 24 * 7

      ctx.cookies.set(ADMIN_TOKEN_COOKIE, data.token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        expires: new Date(Date.now() + SEVEN_DAYS),
      })
    },
  }),
}
