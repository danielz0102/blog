import { test, expect } from 'vitest'
import { formatPost } from './formatPost'
import type { Post } from '~/types'

test('formats post correctly', () => {
  const postId = crypto.randomUUID()
  const commentId = crypto.randomUUID()
  const userId = crypto.randomUUID()
  const mockPost: Post = {
    id: postId,
    title: 'Sample Post',
    content: 'This is a sample post content.',
    createdAt: '2023-01-01T00:00:00Z', // December 31, 2022
    comments: [
      {
        id: commentId,
        content: 'Great post!',
        createdAt: '2023-01-02T00:00:00Z', // January 1, 2023
        user: { id: userId, username: 'User1' }
      }
    ]
  }

  const formattedPost = formatPost(mockPost)

  expect(formattedPost).toEqual({
    id: postId,
    title: 'Sample Post',
    content: 'This is a sample post content.',
    createdAt: 'December 31, 2022',
    comments: [
      {
        id: commentId,
        content: 'Great post!',
        createdAt: 'January 1, 2023',
        user: { id: userId, username: 'User1' }
      }
    ]
  })
})
