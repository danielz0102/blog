import { test, expect } from 'vitest'
import { render } from '@testing-library/react'

import { PASSWORD_PATTERN } from '~/lib/consts'

import { PasswordInput } from '.'

const id = 'test-password-input'

type FieldProps = {
  name?: string
  strong?: boolean
}

const Field = ({ name = 'Password', strong = false }: FieldProps) => (
  <label htmlFor={id}>
    Password
    <PasswordInput id={id} name={name} strong={strong} />
  </label>
)

test('renders password input correctly', () => {
  const { getByLabelText } = render(<Field />)

  const input = getByLabelText('Password')

  expect(input).toBeRequired()
  expect(input).toHaveAttribute('id', id)
  expect(input).toHaveAttribute('type', 'password')
  expect(input).toHaveAttribute('placeholder', '••••••••')
  expect(input).not.toHaveAttribute('pattern', PASSWORD_PATTERN)
})

test('renders strong password input with pattern', () => {
  const { getByLabelText } = render(<Field strong />)

  const input = getByLabelText('Password')

  expect(input).toHaveAttribute('pattern', PASSWORD_PATTERN)
})
