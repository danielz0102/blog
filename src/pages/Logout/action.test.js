import { test, expect } from 'vitest'

import { logoutAction } from './action'

test('removes the token from localStorage', () => {
  localStorage.setItem('token', 'test-token')

  logoutAction()

  expect(localStorage.getItem('token')).toBeNull()
})
