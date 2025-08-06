import type { UUID } from 'crypto'
import { API_URL } from '~/config'

export async function comment(postId: UUID, content: string) {
  const token = localStorage.getItem('token')

  if (!token) {
    throw new Error('No authentication token found')
  }

  const body = { postId, content }
  const response = await fetch(`${API_URL}/comments`, {
    method: 'POST',
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

export async function update({
  postId,
  commentId,
  content
}: {
  postId: UUID
  commentId: UUID
  content: string
}) {
  const token = localStorage.getItem('token')

  if (!token) {
    throw new Error('No authentication token found')
  }

  const response = await fetch(`${API_URL}/comments/${commentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ postId, content })
  })

  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.error || 'Failed to update comment')
  }
}

export async function deleteComment(id: UUID) {
  const token = localStorage.getItem('token')

  if (!token) {
    throw new Error('No authentication token found')
  }

  const response = await fetch(`${API_URL}/comments/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })

  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.error || 'Failed to delete comment')
  }
}
