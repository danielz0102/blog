import { test, expect } from 'vitest'
import { render } from '@testing-library/react'

import { PASSWORD_PATTERN } from '~/lib/consts'

import { PasswordField } from '.'

test('renders password input correctly', () => {
  const { getByLabelText } = render(
    <PasswordField label="Custom Password" name="custom-password" />
  )

  const input = getByLabelText('Custom Password')

  expect(input).toBeRequired()
  expect(input).toHaveAttribute('type', 'password')
  expect(input).toHaveAttribute('name', 'custom-password')
  expect(input).toHaveAttribute('placeholder', '••••••••')
  expect(input).not.toHaveAttribute('pattern', PASSWORD_PATTERN)
})

test('renders strong password input with pattern', () => {
  const { getByLabelText } = render(<PasswordField strong />)

  const input = getByLabelText('Password')

  expect(input).toHaveAttribute('pattern', PASSWORD_PATTERN)
})
