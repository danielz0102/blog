import { test, expect } from 'vitest'
import { logout } from './logout'

test('removes token from localStorage', () => {
  localStorage.setItem('token', 'token-mock')
  logout()
  expect(localStorage.getItem('token')).toBeNull()
})
