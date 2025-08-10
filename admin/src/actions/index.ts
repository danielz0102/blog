import { API_URL } from 'astro:env/server'
import { defineAction } from 'astro:actions'
import { ActionError } from 'astro:actions'
import { z } from 'astro:schema'

export const server = {
  login: defineAction({
    input: z.object({ username: z.string(), password: z.string() }),
    accept: 'form',
    handler: async (input, ctx) => {
      // TODO: Ensure that the user is admin
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

      ctx.cookies.set('admin-token', data.token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      })
    },
  }),
}
