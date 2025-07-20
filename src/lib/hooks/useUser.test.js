import { expect, describe, it, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

import jwt from 'jsonwebtoken'

import { useUser } from './useUser'

const mockToken = jwt.sign({ username: 'test', id: 1 }, 'secret')

vi.mock('@services/auth', () => ({
  login: vi.fn(() => Promise.resolve(mockToken)),
  signUp: vi.fn(() => Promise.resolve(mockToken))
}))

beforeEach(() => {
  localStorage.clear()
})

it('returns a user, a logout, and a sign up function', () => {
  const { result } = renderHook(() => useUser())
  const { user, logout } = result.current

  expect(user).toBeDefined()
  expect(logout).toBeTypeOf('function')
})

describe('user', () => {
  it('is null if no token is present', () => {
    localStorage.removeItem('token')
    const { result } = renderHook(() => useUser())
    const { user } = result.current

    expect(user).toBeNull()
  })

  it('returns the correct data if a token is present', () => {
    const decoded = jwt.decode(mockToken)
    localStorage.setItem('token', mockToken)

    const { result } = renderHook(() => useUser())
    const { user } = result.current

    expect(user).toEqual(decoded)
  })
})

describe('logout', () => {
  it('removes the token from localStorage', () => {
    localStorage.setItem('token', mockToken)
    const { result } = renderHook(() => useUser())
    const { logout } = result.current

    act(() => {
      logout()
    })

    expect(localStorage.getItem('token')).toBeNull()
  })

  it('sets user to null', () => {
    localStorage.setItem('token', mockToken)
    const { result } = renderHook(() => useUser())
    const { logout } = result.current

    act(() => {
      logout()
    })

    const { user } = result.current
    expect(user).toBeNull()
  })
})
