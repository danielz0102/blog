import { test, expect, vi, afterEach } from 'vitest'

import { API_URL } from '~/config'

import { comment } from './comment'

const mockFetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve({})
  })
)

const mockComment = {
  postId: crypto.randomUUID(),
  content: 'This is a test comment'
}

const MOCK_TOKEN = 'mock-token'

vi.stubGlobal('fetch', mockFetch)

afterEach(() => {
  localStorage.clear()
})

test('calls fetch correctly when creating a comment', async () => {
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

test('calls fetch correctly when updating a comment', async () => {
  const { postId, content } = mockComment
  localStorage.setItem('token', MOCK_TOKEN)

  await comment(postId, content, true)

  expect(mockFetch).toHaveBeenCalledWith(`${API_URL}/comments/${postId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${MOCK_TOKEN}`
    },
    body: JSON.stringify({ content })
  })
})

test('throws an error if there is no token', async () => {
  const { postId, content } = mockComment

  const result = comment(postId, content)

  await expect(result).rejects.toThrow()
})

test('throws an error if response is not ok', async () => {
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
