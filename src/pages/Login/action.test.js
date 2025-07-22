import { test, expect, vi } from 'vitest'
import { loginAction } from './action'

import { API_URL } from '@/config'

const mockToken = 'mock-token'
const mockUser = {
  username: 'test',
  password: 'test'
}

const getMockRequest = () =>
  new Request('http://localhost/login', {
    method: 'POST',
    body: new URLSearchParams(mockUser).toString(),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })

vi.stubGlobal(
  'fetch',
  vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ token: mockToken })
    })
  )
)

const fetchMock = vi.spyOn(globalThis, 'fetch')

test('calls fetch correctly', async () => {
  const { username, password } = mockUser

  await loginAction({ request: getMockRequest() })

  expect(fetchMock).toHaveBeenCalledWith(
    expect.stringMatching(`${API_URL}/users/login`),
    expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
  )
})

test('saves token in local storage', async () => {
  await loginAction({ request: getMockRequest() })

  expect(localStorage.getItem('token')).toBe(mockToken)
})

test('responds with a redirection to home', async () => {
  const redirect = await loginAction({ request: getMockRequest() })

  expect(redirect).toEqual(
    new Response(null, {
      status: 302,
      headers: { Location: '/' }
    })
  )
})

test('returns an error if login fails', async () => {
  fetchMock.mockImplementationOnce(() =>
    Promise.resolve({
      ok: false,
      json: () => Promise.resolve({ error: 'Invalid credentials' })
    })
  )

  const response = await loginAction({ request: getMockRequest() })

  expect(response).toEqual({ error: 'Invalid credentials' })
})
