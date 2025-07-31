import { test, expect } from 'vitest'
import { formatDate } from './formatDate'

test('formats date correctly', () => {
  const date = new Date('2023-10-01T12:00:00Z')

  const formattedDate = formatDate(date)

  expect(formattedDate).toBe('October 1, 2023')
})
