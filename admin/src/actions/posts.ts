import type { Post } from '@/env'

import { API_URL } from 'astro:env/server'
import { ActionError, defineAction } from 'astro:actions'
import { z } from 'astro:schema'

import { ADMIN_TOKEN_COOKIE } from '@/consts'
import { validateTokenCookie } from '@utils/validateTokenCookie'
import { formatDate } from '@utils/formatDate'

const getAll = defineAction({
  input: z.object({
    title: z.string().trim().optional(),
    createdAt: z.string().trim().date().optional(),
    startDate: z.string().trim().date().optional(),
    endDate: z.string().trim().date().optional(),
    onlyDraft: z.string().optional(),
  }),
  handler: async (input, ctx): Promise<Post[]> => {
    const tokenCookie = ctx.cookies.get(ADMIN_TOKEN_COOKIE)

    validateTokenCookie(tokenCookie)

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
      createdAt: formatDate(post.createdAt),
    }))
  },
})

const create = defineAction({
  input: z.object({
    title: z.string().trim().nonempty(),
    content: z.string().trim().nonempty(),
    isDraft: z.boolean().default(false),
  }),
  accept: 'form',
  handler: async (input, ctx): Promise<Post> => {
    const tokenCookie = ctx.cookies.get(ADMIN_TOKEN_COOKIE)

    validateTokenCookie(tokenCookie)

    const response = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenCookie.value}`,
      },
      body: JSON.stringify(input),
    })

    if (!response.ok) {
      throw new ActionError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Post could not be created',
      })
    }

    const post: Post = await response.json()
    return post
  },
})

const get = defineAction({
  input: z.object({
    id: z.string().uuid(),
  }),
  handler: async (input, ctx) => {
    const tokenCookie = ctx.cookies.get(ADMIN_TOKEN_COOKIE)
    validateTokenCookie(tokenCookie)

    const response = await fetch(`${API_URL}/posts/${input.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenCookie.value}`,
      },
    })

    if (!response.ok) {
      throw new ActionError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Post could not be retrieved',
      })
    }

    const post: Post = await response.json()
    return {
      ...post,
      createdAt: formatDate(post.createdAt),
    }
  },
})

const update = defineAction({
  input: z.object({
    id: z.string().uuid(),
    title: z.string().trim().nonempty(),
    content: z.string().trim().nonempty(),
    isDraft: z.boolean().default(false),
  }),
  accept: 'form',
  handler: async (input, ctx): Promise<Post> => {
    const tokenCookie = ctx.cookies.get(ADMIN_TOKEN_COOKIE)

    validateTokenCookie(tokenCookie)

    const response = await fetch(`${API_URL}/posts/${input.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenCookie.value}`,
      },
      body: JSON.stringify(input),
    })

    if (!response.ok) {
      throw new ActionError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Post could not be updated',
      })
    }

    const post: Post = await response.json()
    return post
  },
})

export const posts = { getAll, create, get, update }
