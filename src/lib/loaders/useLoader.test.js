import { test, expect, afterEach } from 'vitest'

import jwt from 'jsonwebtoken'
import { userLoader } from './userLoader'

afterEach(() => {
  localStorage.clear()
})

test('returns null if there is no token in local storage', () => {
  const result = userLoader()
  expect(result).toBeNull()
})

test('returns user data if token is present in local storage', () => {
  const user = { id: 1, name: 'John Doe' }
  const token = jwt.sign(user, 'secret')
  const decoded = jwt.decode(token)
  localStorage.setItem('token', token)

  const result = userLoader()

  expect(result).toEqual(decoded)
})
