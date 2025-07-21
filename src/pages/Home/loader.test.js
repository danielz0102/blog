import { test, expect, vi } from 'vitest'
import { postsLoader } from './loader'

import { API_URL } from '@/config'
import { formatDate } from '@/lib/utils/formatDate'

const postsMock = [
  {
    id: 1,
    title: 'Test Post',
    createdAt: new Date(),
    content: 'This is a test post.'
  },
  {
    id: 2,
    title: 'Another Post',
    createdAt: new Date(),
    content: 'This is another test post.'
  }
]

const formattedPostsMock = postsMock
  .toSorted((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  .map((post) => ({
    id: post.id,
    title: post.title,
    content: post.content,
    date: formatDate(post.createdAt)
  }))

vi.stubGlobal(
  'fetch',
  vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(postsMock)
    })
  )
)

test('calls fetch with the correct URL', async () => {
  await postsLoader()
  expect(fetch).toHaveBeenCalledWith(`${API_URL}/posts`)
})

test('returns formatted posts', async () => {
  const response = await postsLoader()
  expect(response).toEqual(formattedPostsMock)
})

test('returns an error message if fetch fails', async () => {
  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: false,
      json: () => Promise.resolve({ error: 'Failed to fetch posts' })
    })
  )

  const response = await postsLoader()

  expect(response).toEqual({ error: 'Failed to fetch posts' })
})
