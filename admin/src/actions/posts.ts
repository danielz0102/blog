import { ActionError, defineAction } from 'astro:actions'

import { API_URL } from 'astro:env/server'
import { ADMIN_TOKEN_COOKIE } from '@/consts'
import type { GetAllPostsResponse } from '@/env'

export const posts = {
  getAll: defineAction({
    handler: async (_, ctx) => {
      const tokenCookie = ctx.cookies.get(ADMIN_TOKEN_COOKIE)

      if (!tokenCookie) {
        throw new ActionError({
          code: 'UNAUTHORIZED',
          message: 'Authentication failed',
        })
      }

      const response = await fetch(`${API_URL}/posts/all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenCookie.value}`,
        },
      })

      if (!response.ok) {
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Posts could not be retrieved',
        })
      }

      const data: GetAllPostsResponse[] = await response.json()
      return data.map((post) => ({
        ...post,
        createdAt: new Date(post.createdAt).toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
      }))
    },
  }),
}
