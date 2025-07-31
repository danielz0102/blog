import { formatDate } from './formatDate'
import type { Post } from '~/types'

export function formatPost(post: Post): Post {
  return {
    ...post,
    createdAt: formatDate(post.createdAt),
    comments: post.comments.map((comment) => ({
      ...comment,
      createdAt: formatDate(comment.createdAt)
    }))
  }
}
