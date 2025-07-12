import { it, expect, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'

import { usePosts } from '@/lib/hooks/usePosts'
import { getPosts } from '@/services/blogApi'

vi.mock('@/services/blogApi')

it('should fetch posts successfully', async () => {
  const mockPost = [{ id: 1, title: 'Test Post' }]

  vi.mocked(getPosts).mockResolvedValueOnce(mockPost)

  const { result } = renderHook(() => usePosts())
  const { posts, loading, error } = result.current

  expect(loading).toBe(true)
  expect(error).toBe(false)
  expect(posts).toEqual([])

  await waitFor(() => {
    const {
      loading: newLoading,
      error: newError,
      posts: newPosts,
    } = result.current

    expect(newLoading).toBe(false)
    expect(newError).toBe(false)
    expect(newPosts).toEqual(mockPost)
  })
})

it('should handle fetch error', async () => {
  vi.mocked(getPosts).mockRejectedValueOnce(new Error('Fetch error'))

  const { result } = renderHook(() => usePosts())

  await waitFor(() => {
    const { loading, error, posts } = result.current

    expect(loading).toBe(false)
    expect(error).toBe(true)
    expect(posts).toEqual([])
  })
})
