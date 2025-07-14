import { describe, it, expect, vi } from 'vitest'

import { login, signUp } from '@services/auth'
import api from '@services/api'
import { beforeEach } from 'vitest'

vi.mock('@services/api', () => ({
  default: vi.fn(() => Promise.resolve({ token: 'mocked-token' })),
}))

beforeEach(() => {
  localStorage.clear()
})

describe('login', () => {
  it('calls /users/login with method POST and credentials', async () => {
    const credentials = { username: 'test', password: 'test' }

    await login(credentials)

    expect(api).toHaveBeenCalledWith('/users/login', {
      method: 'POST',
      body: credentials,
    })
  })

  it('saves token to localStorage on successful login', async () => {
    await login()
    expect(localStorage.getItem('token')).toBe('mocked-token')
  })
})

describe('signUp', () => {
  it('calls /users/sign-up with method POST and user data', async () => {
    const data = { username: 'test', password: 'test' }

    await signUp(data)

    expect(api).toHaveBeenCalledWith('/users/sign-up', {
      method: 'POST',
      body: data,
    })
  })

  it('saves token to localStorage on successful sign-up', async () => {
    await signUp()
    expect(localStorage.getItem('token')).toBe('mocked-token')
  })
})
