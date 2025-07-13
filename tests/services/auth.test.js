import { describe, it, expect, vi } from 'vitest'

import { login, signUp } from '@services/auth'
import api from '@services/api'

vi.mock('@services/api')

describe('login', () => {
  it('calls /users/login with method POST and credentials', async () => {
    const credentials = { username: 'test', password: 'test' }

    await login(credentials)

    expect(api).toHaveBeenCalledWith('/users/login', {
      method: 'POST',
      body: credentials,
    })
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
})
