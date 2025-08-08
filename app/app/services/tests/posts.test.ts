import type { GetPostResponse, GetRecentPostsResponse } from '~/types'

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mockPosts } from 'tests/mocks/postsMock'

import { API_URL } from '~/config'
import { formatPost } from '~/lib/formatPost'

import { getRecentPosts, getPost } from '../posts'

const formattedPosts = mockPosts.map(formatPost)
const mockFetch = vi.fn()

vi.stubGlobal('fetch', mockFetch)

describe('getRecentPosts', () => {
  beforeEach(() => {
    mockFetch.mockReturnValue(
      Promise.resolve({
        ok: true,
        status: 200,
        json: (): Promise<GetRecentPostsResponse> => Promise.resolve(mockPosts)
      })
    )
  })

  it('calls fetch correctly', async () => {
    await getRecentPosts()

    expect(mockFetch).toHaveBeenCalledWith(`${API_URL}/posts`)
  })

  it('throws an error if response is not ok', async () => {
    const error = 'Internal Server Error'
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ error })
      })
    )

    const result = getRecentPosts()

    await expect(result).rejects.toThrow(error)
  })

  it('returns posts with date formatted', async () => {
    const posts = await getRecentPosts()

    expect(posts).toEqual(formattedPosts)
  })
})

describe('getPost', () => {
  const id = crypto.randomUUID()

  beforeEach(() => {
    mockFetch.mockReturnValue(
      Promise.resolve({
        ok: true,
        status: 200,
        json: (): Promise<GetPostResponse> => Promise.resolve(mockPosts[0])
      })
    )
  })

  it('calls fetch correctly', async () => {
    await getPost(id)

    expect(mockFetch).toHaveBeenCalledWith(`${API_URL}/posts/${id}`)
  })

  it('throws an error if response is not ok', async () => {
    const error = 'Internal Server Error'
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ error })
      })
    )

    const result = getPost(id)

    await expect(result).rejects.toThrow(error)
  })

  it('return post with date formatted', async () => {
    const id = mockPosts[0].id
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockPosts[0])
      })
    )

    const post = await getPost(id)

    expect(post).toEqual(formattedPosts[0])
  })
})
