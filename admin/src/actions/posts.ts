import { ActionError, defineAction } from 'astro:actions'
import { z } from 'astro:schema'

import { API_URL } from 'astro:env/server'
import { ADMIN_TOKEN_COOKIE } from '@/consts'
import type { Post } from '@/env'

const getAll = defineAction({
  input: z.object({
    title: z.string().trim().optional(),
    createdAt: z.string().trim().date().optional(),
    startDate: z.string().trim().date().optional(),
    endDate: z.string().trim().date().optional(),
  }),
  handler: async (input, ctx): Promise<Post[]> => {
    const tokenCookie = ctx.cookies.get(ADMIN_TOKEN_COOKIE)

    if (!tokenCookie) {
      throw new ActionError({
        code: 'UNAUTHORIZED',
        message: 'Authentication failed',
      })
    }

    const queryParams = new URLSearchParams(input)
    const response = await fetch(`${API_URL}/posts/all?${queryParams}`, {
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

    const data: Post[] = await response.json()
    return data.map((post) => ({
      ...post,
      createdAt: new Date(post.createdAt).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    }))
  },
})

export const posts = { getAll }
