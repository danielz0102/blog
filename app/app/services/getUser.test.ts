import { test, expect, afterEach } from 'vitest'

import jwt from 'jsonwebtoken'
import { jwtDecode } from 'jwt-decode'
import { getUser } from './getUser'

afterEach(() => {
  localStorage.clear()
})

test('returns user data if token is present', () => {
  const token = jwt.sign({ id: 1, email: 'test@example.com' }, 'secret')
  const decoded = jwtDecode(token)
  localStorage.setItem('token', token)

  const result = getUser()

  expect(result).toEqual(decoded)
})

test('returns null if token is not present', () => {
  const result = getUser()

  expect(result).toBeNull()
})
