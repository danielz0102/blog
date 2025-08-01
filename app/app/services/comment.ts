import type { UUID } from 'crypto'
import { API_URL } from '~/config'

export async function comment(postId: UUID, content: string, update = false) {
  const token = localStorage.getItem('token')

  if (!token) {
    throw new Error('No authentication token found')
  }

  const endpoint = update
    ? `${API_URL}/comments/${postId}`
    : `${API_URL}/comments`

  const body = update ? { content } : { postId, content }

  const response = await fetch(endpoint, {
    method: update ? 'PUT' : 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  })

  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.error || 'Failed to post comment')
  }
}
