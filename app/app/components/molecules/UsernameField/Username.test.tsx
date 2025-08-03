import { test, expect } from 'vitest'
import { render } from '@testing-library/react'

import { UsernameField } from '.'

test('renders username field', () => {
  const { getByLabelText } = render(<UsernameField />)

  const input = getByLabelText(/username/i)

  expect(input).toHaveAttribute('type', 'text')
  expect(input).toHaveAttribute('name', 'username')
  expect(input).toHaveAttribute('placeholder', '@john_doe123')
  expect(input).toBeRequired()
})
