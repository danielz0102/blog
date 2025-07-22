import { API_URL } from '@/config'
import { formatDate } from '@/lib/utils/formatDate'

const cache = []

export function postsLoader() {
  if (cache.length > 0) {
    return { posts: cache }
  }

  const posts = fetch(`${API_URL}/posts`).then(async (response) => {
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch posts')
    }

    const posts = data
      .toSorted((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map((post) => ({
        id: post.id,
        title: post.title,
        content: post.content,
        date: formatDate(post.createdAt)
      }))

    cache.push(...posts)

    return posts
  })

  return { posts }
}
