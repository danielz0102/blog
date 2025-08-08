import { test, expect, vi, afterEach } from 'vitest'
import { auth } from '../auth'
import { API_URL } from '~/config'

const user = {
  username: 'testuser',
  password: 'testpass'
}
const MOCK_TOKEN = 'mock-token'
const mockFetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: (): Promise<{ token?: typeof MOCK_TOKEN; error?: string }> =>
      Promise.resolve({ token: MOCK_TOKEN })
  })
)

vi.stubGlobal('fetch', mockFetch)

afterEach(() => {
  localStorage.clear()
})

test('calls fetch with correct parameters when is for login', async () => {
  const { username, password } = user

  await auth(username, password)

  expect(mockFetch).toHaveBeenCalledWith(`${API_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
})

test('calls fetch with correct parameters when is for registration', async () => {
  const { username, password } = user

  await auth(username, password, true)

  expect(mockFetch).toHaveBeenCalledWith(`${API_URL}/users/sign-up`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
})

test('returns false if auth fails', async () => {
  const { username, password } = user
  mockFetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: false,
      status: 400,
      json: () => Promise.resolve({ error: 'Invalid credentials' })
    })
  )

  const result = await auth(username, password)

  expect(result).toBe(false)
})

test('saves token and returns true', async () => {
  const { username, password } = user

  const result = await auth(username, password)

  expect(localStorage.getItem('token')).toBe(MOCK_TOKEN)
  expect(result).toBe(true)
})
