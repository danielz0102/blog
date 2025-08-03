import { test, expect, vi } from 'vitest'
import { render } from '@testing-library/react'

import { PASSWORD_PATTERN } from '~/lib/consts'

import { RegisterForm } from '.'
import type { CustomFormProps } from '../CustomForm'

vi.mock('../CustomForm', () => ({
  CustomForm: ({ children, ...props }: CustomFormProps) => (
    <div data-testid="custom-form">
      {JSON.stringify(props)}
      {children}
    </div>
  )
}))

test('renders correct inputs', () => {
  const { getByLabelText } = render(<RegisterForm />)

  const usernameInput = getByLabelText('Username')
  const passwordInput = getByLabelText('Password')
  const confirmPasswordInput = getByLabelText('Confirm Password')

  expect(usernameInput).toBeRequired()
  expect(usernameInput).toHaveAttribute('name', 'username')

  expect(passwordInput).toBeRequired()
  expect(passwordInput).toHaveAttribute('name', 'password')
  expect(passwordInput).toHaveAttribute('pattern', PASSWORD_PATTERN)

  expect(confirmPasswordInput).toBeRequired()
  expect(confirmPasswordInput).toHaveAttribute('name', 'confirmPassword')
})

test('renders CustomForm with correct props', () => {
  const { getByTestId } = render(<RegisterForm />)
  const customForm = getByTestId('custom-form')

  expect(customForm).toHaveTextContent(
    JSON.stringify({ method: 'post', action: '/auth/register' })
  )
})

test('shows password info', () => {
  const { queryByText } = render(<RegisterForm />)

  expect(queryByText(/password must contain at least/i)).toBeInTheDocument()
  expect(queryByText(/8 characters/i)).toBeInTheDocument()
  expect(queryByText(/1 lowercase letter/i)).toBeInTheDocument()
  expect(queryByText(/1 uppercase letter/i)).toBeInTheDocument()
  expect(queryByText(/1 number/i)).toBeInTheDocument()
  expect(queryByText(/1 special character/i)).toBeInTheDocument()
})
