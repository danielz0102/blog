import { test, expect, vi, beforeEach } from 'vitest'
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

const fetchMock = vi.spyOn(globalThis, 'fetch')

beforeEach(() => {
  vi.resetModules()
  vi.clearAllMocks()
})

test('calls fetch with the correct URL', () => {
  postsLoader()
  expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/posts`)
})

test('returns formatted posts', async () => {
  const { posts } = postsLoader()
  expect(await posts).toEqual(formattedPostsMock)
})

test('throws an error message if fetch fails', async () => {
  const { postsLoader } = await import('./loader')
  const errorMessage = 'Failed to fetch posts'
  fetchMock.mockImplementationOnce(() =>
    Promise.resolve({
      ok: false,
      json: () => Promise.resolve({ error: errorMessage })
    })
  )

  const { posts } = postsLoader()

  await expect(posts).rejects.toThrow(errorMessage)
})

test('uses cache on subsequent calls', async () => {
  const { postsLoader } = await import('./loader')

  const { posts: first } = postsLoader()
  await first
  const { posts: second } = postsLoader()
  await second

  expect(fetchMock).toHaveBeenCalledOnce()
})
