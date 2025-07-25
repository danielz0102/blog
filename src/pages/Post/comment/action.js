import { data } from 'react-router'
import { API_URL } from '@/config'

export async function commentAction({ request, params }) {
  const token = localStorage.getItem('token')

  if (!token) {
    return data({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await request.formData()
  const { content } = Object.fromEntries(formData)

  const response = await fetch(`${API_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ content, postId: params.id })
  })
  const result = await response.json()

  if (!response.ok) {
    return data(
      { error: result.error || 'Failed to post comment' },
      { status: response.status }
    )
  }

  return result
}
