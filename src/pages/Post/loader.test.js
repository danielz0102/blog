import { test, expect, vi } from 'vitest'

import { formatDate } from '@/lib/utils/formatDate'
import { API_URL } from '@/config'
import { postLoader } from './loader'

const mockPost = {
  id: '123',
  title: 'Test Post',
  content: 'This is a test post.',
  createdAt: '2023-10-01T12:00:00Z',
  comments: [
    {
      id: 1,
      user: { username: 'User1' },
      content: 'Great post!',
      createdAt: '2023-10-02T12:00:00Z'
    },
    {
      id: 2,
      user: { username: 'User2' },
      content: 'Thanks for sharing!',
      createdAt: '2023-10-03T12:00:00Z'
    }
  ]
}
const params = { id: mockPost.id }

const fetchMock = vi.fn(() => ({
  ok: true,
  json: () => Promise.resolve(mockPost)
}))

vi.stubGlobal('fetch', fetchMock)

test('calls fetch correctly', async () => {
  await postLoader({ params })

  expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/posts/${mockPost.id}`)
})

test('returns post properly formatted', async () => {
  const result = await postLoader({ params })

  expect(result).toEqual({
    id: mockPost.id,
    title: mockPost.title,
    content: mockPost.content,
    date: formatDate(mockPost.createdAt),
    comments: mockPost.comments.map((comment) => ({
      id: comment.id,
      username: comment.user.username,
      content: comment.content,
      date: formatDate(comment.createdAt)
    }))
  })
})

test('responds with an error on fetch failure', async () => {
  fetchMock.mockImplementationOnce(() => ({
    ok: false,
    json: () => Promise.resolve({ error: 'Network error' })
  }))

  await expect(postLoader({ params })).rejects.toThrow('Network error')
})
