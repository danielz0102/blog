import type { Post } from '~/types'

export const mockPosts: Post[] = [
  {
    id: crypto.randomUUID(),
    title: 'Test Post',
    content: 'This is a test post.',
    createdAt: '2023-10-01T12:00:00Z',
    comments: [
      {
        id: crypto.randomUUID(),
        content: 'Great post!',
        createdAt: '2023-10-01T12:00:00Z',
        user: { id: crypto.randomUUID(), username: 'User1' }
      },
      {
        id: crypto.randomUUID(),
        content: 'Thanks for sharing!',
        createdAt: '2023-10-01T12:00:00Z',
        user: { id: crypto.randomUUID(), username: 'User2' }
      }
    ]
  },
  {
    id: crypto.randomUUID(),
    title: 'Another Post',
    content: 'This is another post.',
    createdAt: '2023-10-01T12:00:00Z',
    comments: [
      {
        id: crypto.randomUUID(),
        content: 'Interesting read.',
        createdAt: '2023-10-01T12:00:00Z',
        user: { id: crypto.randomUUID(), username: 'User3' }
      },
      {
        id: crypto.randomUUID(),
        content: 'I learned something new.',
        createdAt: '2023-10-01T12:00:00Z',
        user: { id: crypto.randomUUID(), username: 'User4' }
      }
    ]
  }
]
