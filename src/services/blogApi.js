import { VITE_API_URL } from '@/config'

export async function getPosts() {
  const response = await fetch(`${VITE_API_URL}/posts`)

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  const posts = await response.json()

  return posts
    .toSorted((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6)
    .map((post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      date: new Date(post.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    }))
}
