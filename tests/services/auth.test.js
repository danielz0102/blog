import { describe, it, expect, vi, beforeEach } from 'vitest'

import { login, signUp } from '@services/auth'
import api from '@services/api'

vi.mock('@services/api', () => ({
  default: vi.fn(() => Promise.resolve({ token: 'mocked-token' })),
}))

beforeEach(() => {
  localStorage.clear()
})

const credentials = { username: 'test', password: 'test' }

describe('login', () => {
  it('calls /users/login with method POST and credentials', async () => {
    await login(credentials)

    expect(api).toHaveBeenCalledWith('/users/login', {
      method: 'POST',
      body: credentials,
    })
  })

  it('returns the token on successful login', async () => {
    const token = await login(credentials)
    expect(token).toBe('mocked-token')
  })

  it('throws an error if credentials are not passed', async () => {
    await expect(login()).rejects.toThrow('Credentials are required')
  })
})

describe('signUp', () => {
  it('calls /users/sign-up with method POST and user data', async () => {
    await signUp(credentials)

    expect(api).toHaveBeenCalledWith('/users/sign-up', {
      method: 'POST',
      body: credentials,
    })
  })

  it('returns the token on success', async () => {
    const token = await signUp(credentials)
    expect(token).toBe('mocked-token')
  })

  it('throws an error if no data is passed', async () => {
    await expect(signUp()).rejects.toThrow('Credentials are required')
  })
})
