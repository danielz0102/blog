import { describe, it, expect, vi } from 'vitest'

import { getPosts } from '@services/posts'
import api from '@services/api'
import { beforeEach } from 'vitest'

vi.mock('@services/api')

describe('getPosts', () => {
  beforeEach(() => {
    api.mockResolvedValue([])
  })

  it('calls /posts', async () => {
    await getPosts()
    expect(api).toHaveBeenCalledWith('/posts')
  })

  it('calls with limit query param', async () => {
    await getPosts(10)
    expect(api).toHaveBeenCalledWith('/posts?limit=10')
  })

  it('returns posts with correct format', async () => {
    api.mockResolvedValueOnce([
      {
        id: 1,
        title: 'Post 1',
        content: 'Content 1',
        createdAt: '2023-01-01T00:00:00Z' // December 31, 2022
      },
      {
        id: 2,
        title: 'Post 2',
        content: 'Content 2',
        createdAt: '2023-01-02T00:00:00Z' // January 1, 2023
      }
    ])

    const posts = await getPosts()

    expect(posts).toEqual([
      {
        id: 2,
        title: 'Post 2',
        content: 'Content 2',
        date: 'January 1, 2023'
      },
      {
        id: 1,
        title: 'Post 1',
        content: 'Content 1',
        date: 'December 31, 2022'
      }
    ])
  })
})
