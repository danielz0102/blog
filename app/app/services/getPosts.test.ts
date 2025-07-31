import type { GetPostsResponse } from '~/types'

import { test, expect, vi } from 'vitest'
import { mockPosts } from 'tests/mocks/postsMock'

import { API_URL } from '~/config'
import { formatPost } from '~/lib/formatPost'

import { getPosts } from './getPosts'

const formattedPosts = mockPosts.map(formatPost)
const mockFetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: (): Promise<GetPostsResponse> => Promise.resolve(mockPosts)
  })
)

vi.stubGlobal('fetch', mockFetch)

test('calls fetch correctly when no id is provided', async () => {
  await getPosts()

  expect(mockFetch).toHaveBeenCalledWith(`${API_URL}/posts`)
})

test('calls fetch correctly when id is provided', async () => {
  const id = crypto.randomUUID()

  await getPosts(id)

  expect(mockFetch).toHaveBeenCalledWith(`${API_URL}/posts/${id}`)
})

test('throws an error if response is not ok', async () => {
  const error = 'Internal Server Error'
  mockFetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: false,
      status: 500,
      json: () => Promise.resolve({ error })
    })
  )

  const result = getPosts()

  await expect(result).rejects.toThrow(error)
})

test('returns posts with date formatted', async () => {
  const posts = await getPosts()

  expect(posts).toEqual(formattedPosts)
})

test('returns a single post formatted if id is provided', async () => {
  const id = mockPosts[0].id
  mockFetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockPosts[0])
    })
  )

  const post = await getPosts(id)

  expect(post).toEqual(formattedPosts[0])
})
