import { API_URL } from '@/config'
import { formatDate } from '@/lib/utils/formatDate'

export async function postLoader({ params }) {
  const response = await fetch(`${API_URL}/posts/${params.id}`)

  const post = await response.json()

  if (!response.ok) {
    throw new Error(post.error || 'Failed to fetch post')
  }

  return {
    id: post.id,
    title: post.title,
    content: post.content,
    date: formatDate(post.createdAt),
    comments: post.comments.map((comment) => ({
      id: comment.id,
      username: comment.username,
      content: comment.content,
      date: formatDate(comment.createdAt)
    }))
  }
}
