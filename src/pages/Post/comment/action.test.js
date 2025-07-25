import { test, expect, vi } from 'vitest'

import { data } from 'react-router'
import { API_URL } from '@/config'
import { commentAction } from './action'

const mockComment = {
  content: 'This is a test comment',
  postId: crypto.randomUUID()
}
const mockToken = 'mock-token'
const getItemMock = vi.fn(() => mockToken)
const fetchMock = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockComment)
  })
)

vi.stubGlobal('fetch', fetchMock)
vi.stubGlobal('localStorage', { getItem: getItemMock })

function action() {
  const request = new Request(
    `http://localhost/posts/${mockComment.postId}/comment`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ content: mockComment.content }).toString()
    }
  )
  const params = { id: mockComment.postId }

  return commentAction({ request, params })
}

test('calls fetch correctly', async () => {
  await action()

  expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${mockToken}`
    },
    body: JSON.stringify(mockComment)
  })
})

test('returns an error if response is not ok', async () => {
  fetchMock.mockImplementationOnce(() =>
    Promise.resolve({
      ok: false,
      status: 500,
      json: () => Promise.resolve({ error: 'Failed to post comment' })
    })
  )

  const result = await action()

  expect(result).toEqual(
    data({ error: 'Failed to post comment' }, { status: 500 })
  )
})

test('returns an error if there is no token', async () => {
  getItemMock.mockReturnValueOnce(null)

  const result = await action()

  expect(result).toEqual(data({ error: 'Unauthorized' }, { status: 401 }))
})

test('returns fetch result', async () => {
  const result = await action()

  expect(result).toEqual(mockComment)
})
