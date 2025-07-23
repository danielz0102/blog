import { test, expect, vi, afterEach } from 'vitest'

import { data, redirect } from 'react-router'
import { API_URL } from '@/config'
import { authAction } from './authAction'

const mockToken = 'mock-token'
const mockUser = {
  username: 'test',
  password: 'test'
}
const fetchMock = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ token: mockToken })
  })
)
const getRequest = (endpoint) =>
  new Request(`http://localhost/${endpoint}`, {
    method: 'POST',
    body: new URLSearchParams(mockUser).toString(),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })

vi.stubGlobal('fetch', fetchMock)

afterEach(() => {
  fetchMock.mockClear()
  localStorage.clear()
})

test('calls fetch correctly for login', async () => {
  await authAction({ request: getRequest('login') })

  expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(mockUser)
  })
})

test('calls fetch correctly for sign-up', async () => {
  await authAction({ request: getRequest('sign-up') })

  expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/users/sign-up`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(mockUser)
  })
})

test('saves token in local storage on successful response', async () => {
  await authAction({ request: getRequest('login') })

  expect(localStorage.getItem('token')).toBe(mockToken)
})

test('does not save token in local storage on failed response', async () => {
  fetchMock.mockImplementationOnce(() =>
    Promise.resolve({
      ok: false,
      json: () => Promise.resolve({ error: 'Login failed' })
    })
  )

  await authAction({ request: getRequest('login') })

  expect(localStorage.getItem('token')).toBeNull()
})

test('responds with an error if auth service fails', async () => {
  fetchMock.mockImplementationOnce(() =>
    Promise.resolve({
      ok: false,
      status: 400,
      json: () => Promise.resolve({ error: 'Login failed' })
    })
  )

  const response = await authAction({ request: getRequest('login') })

  expect(response).toEqual(data({ error: 'Login failed' }, { status: 400 }))
})

test('responds with a redirection to home', async () => {
  const response = await authAction({ request: getRequest('login') })

  expect(response).toEqual(redirect('/'))
})
