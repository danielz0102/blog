import { test, expect, vi, afterEach } from 'vitest'

import { data } from 'react-router'
import { API_URL } from '@/config'
import { commentAction } from './action'

const mockComment = { postId: '123', content: 'This is a test comment' }
const mockToken = 'mock-token'
const fetchMock = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockComment)
  })
)
const getItemMock = vi.fn(() => mockToken)

const getRequest = (endpoint) =>
  new Request(`http://localhost/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(mockComment).toString()
  })

vi.stubGlobal('fetch', fetchMock)
vi.stubGlobal('localStorage', { getItem: getItemMock })

afterEach(() => {
  fetchMock.mockClear()
})

test('calls fetch correctly', async () => {
  await commentAction({ request: getRequest('post') })

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

  const result = await commentAction({ request: getRequest('post') })

  expect(result).toEqual(
    data({ error: 'Failed to post comment' }, { status: 500 })
  )
})

test('returns an error if there is no token', async () => {
  getItemMock.mockReturnValueOnce(null)

  const result = await commentAction({ request: getRequest('post') })

  expect(result).toEqual(data({ error: 'Unauthorized' }, { status: 401 }))
})

test('returns fetch result', async () => {
  const result = await commentAction({ request: getRequest('post') })

  expect(result).toEqual(mockComment)
})
