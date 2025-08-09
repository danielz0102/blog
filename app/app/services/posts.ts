import type { GetPostResponse, GetRecentPostsResponse, Post } from '~/types'
import type { UUID } from 'crypto'

import { formatPost } from '~/lib/formatPost'
import { API_URL } from '~/config'

export async function getRecentPosts(
  title: string | null = null
): Promise<Post[]> {
  const response = await fetch(
    `${API_URL}/posts${title ? `?title=${encodeURIComponent(title)}` : ''}`
  )
  const data: GetRecentPostsResponse = await response.json()

  if (!response.ok || 'error' in data) {
    const error = (() => {
      if ('error' in data) {
        return data.error
      }

      return 'Failed to fetch posts'
    })()

    throw new Error(error)
  }

  return data.map(formatPost)
}

export async function getPost(id: UUID): Promise<Post> {
  const response = await fetch(`${API_URL}/posts/${id}`)
  const data: GetPostResponse = await response.json()

  if (!response.ok || 'error' in data) {
    const error = (() => {
      if ('error' in data) {
        return data.error
      }

      return 'Failed to fetch post'
    })()

    throw new Error(error)
  }

  return formatPost(data)
}
