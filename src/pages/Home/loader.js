import { API_URL } from '@/config'
import { formatDate } from '@/lib/utils/formatDate'

export async function postsLoader() {
  const response = await fetch(`${API_URL}/posts`)
  const data = await response.json()

  if (!response.ok) {
    return { error: data.error || 'Failed to fetch posts' }
  }

  return data
    .toSorted((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map((post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      date: formatDate(post.createdAt)
    }))
}
