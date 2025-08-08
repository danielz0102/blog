import { describe, it, expect, vi, afterEach } from 'vitest'

import { API_URL } from '~/config'

import { comment, deleteComment, update } from '../comment'

const MOCK_TOKEN = 'mock-token'

const mockFetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve({})
  })
)

vi.stubGlobal('fetch', mockFetch)

afterEach(() => {
  localStorage.clear()
})

describe('comment', () => {
  const mockComment = {
    postId: crypto.randomUUID(),
    content: 'This is a test comment'
  }

  it('calls fetch correctly', async () => {
    const { postId, content } = mockComment
    localStorage.setItem('token', MOCK_TOKEN)

    await comment(postId, content)

    expect(mockFetch).toHaveBeenCalledWith(`${API_URL}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${MOCK_TOKEN}`
      },
      body: JSON.stringify(mockComment)
    })
  })

  it('throws an error if there is no token', async () => {
    const { postId, content } = mockComment

    const result = comment(postId, content)

    await expect(result).rejects.toThrow()
  })

  it('throws an error if response is not ok', async () => {
    const { postId, content } = mockComment
    localStorage.setItem('token', MOCK_TOKEN)
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ error: 'Internal Server Error' })
      })
    )

    const result = comment(postId, content)

    await expect(result).rejects.toThrow('Internal Server Error')
  })
})

describe('update', () => {
  const commentId = crypto.randomUUID()
  const content = 'This is an updated comment'

  it('calls fetch correctly', async () => {
    localStorage.setItem('token', MOCK_TOKEN)

    await update(commentId, content)

    expect(mockFetch).toHaveBeenCalledWith(`${API_URL}/comments/${commentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${MOCK_TOKEN}`
      },
      body: JSON.stringify({ content })
    })
  })

  it('throws an error if there is no token', async () => {
    const result = update(commentId, content)

    await expect(result).rejects.toThrow()
  })

  it('throws an error if response is not ok', async () => {
    localStorage.setItem('token', MOCK_TOKEN)
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ error: 'Internal Server Error' })
      })
    )

    const result = update(commentId, content)

    await expect(result).rejects.toThrow('Internal Server Error')
  })
})

describe('deleteComment', () => {
  const commentId = crypto.randomUUID()

  it('calls fetch correctly', async () => {
    localStorage.setItem('token', MOCK_TOKEN)

    await deleteComment(commentId)

    expect(mockFetch).toHaveBeenCalledWith(`${API_URL}/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${MOCK_TOKEN}`
      }
    })
  })

  it('throws an error if there is no token', async () => {
    const result = deleteComment(commentId)

    await expect(result).rejects.toThrow()
  })

  it('throws an error if response is not ok', async () => {
    localStorage.setItem('token', MOCK_TOKEN)
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ error: 'Internal Server Error' })
      })
    )

    const result = deleteComment(commentId)

    await expect(result).rejects.toThrow('Internal Server Error')
  })
})
