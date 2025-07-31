import type { Post } from '~/types'
import type { UUID } from 'crypto'
import type { GetPostsResponse } from '~/types'

import { formatPost } from '~/lib/formatPost'
import { API_URL } from '~/config'

export async function getPosts(id: UUID | null = null): Promise<Post[] | Post> {
  const response = await fetch(`${API_URL}/posts${id ? `/${id}` : ''}`)
  const data: GetPostsResponse = await response.json()

  if (!response.ok || 'error' in data) {
    const error = (() => {
      if ('error' in data) {
        return data.error
      }

      return 'Failed to fetch posts'
    })()

    throw new Error(error)
  }

  if (!Array.isArray(data)) {
    return formatPost(data)
  }

  return data.map(formatPost)
}
