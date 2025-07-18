import api from './api'

export const getPosts = async (limit = null) => {
  const queryString = (() => {
    if (!limit) return ''

    const params = new URLSearchParams({ limit })

    return `?${params.toString()}`
  })()

  const posts = await api(`/posts${queryString}`)

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

  return posts
    .toSorted((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, limit || 6)
    .map((post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      date: formatDate(post.createdAt)
    }))
}
