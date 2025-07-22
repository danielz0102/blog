import { API_URL } from '@/config'
import { formatDate } from '@/lib/utils/formatDate'

export function postsLoader() {
  const posts = fetch(`${API_URL}/posts`).then(async (response) => {
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch posts')
    }

    return data
      .toSorted((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map((post) => ({
        id: post.id,
        title: post.title,
        content: post.content,
        date: formatDate(post.createdAt)
      }))
  })

  return { posts }
}
