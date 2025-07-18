import { test, expect, vi, beforeEach } from 'vitest'

import api from '@services/api'
import { ApiError } from '@/lib/customErrors/ApiError'

vi.stubGlobal(
  'fetch',
  vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({})
    })
  )
)

beforeEach(() => {
  vi.clearAllMocks()
})

test('makes a GET request by default', async () => {
  await api('/test-endpoint')

  expect(fetch).toHaveBeenCalledWith(
    expect.stringContaining('/test-endpoint'),
    expect.objectContaining({ method: 'GET' })
  )
})

test('always makes a request with the header Content-Type: application/json', async () => {
  await api('/test-endpoint')

  expect(fetch.mock.calls[0][1].headers).toEqual({
    'Content-Type': 'application/json'
  })
})

test('adds Authorization header if the token is present', async () => {
  localStorage.setItem('token', 'test-token')

  await api('/test-endpoint')

  expect(fetch.mock.calls[0][1].headers).toMatchObject({
    Authorization: 'Bearer test-token'
  })
})

test('makes a request with the method provided', async () => {
  await api('/test-endpoint', { method: 'POST' })

  expect(fetch.mock.calls[0][1].method).toBe('POST')
})

test('makes a request with the body provided', async () => {
  const body = { key: 'value' }

  await api('/test-endpoint', { method: 'POST', body })

  expect(fetch.mock.calls[0][1].body).toBe(JSON.stringify(body))
})

test('throws an error if the response is not ok', async () => {
  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: false,
      json: () =>
        Promise.resolve({
          message: 'Error occurred'
        }),
      status: 400
    })
  )

  await expect(api('/test-endpoint')).rejects.toThrow(
    new ApiError('API error', 400, { message: 'Error occurred' })
  )
})
