import { test, expect, vi } from 'vitest'
import { render } from '@testing-library/react'

import { LoginForm } from '.'
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
  const { getByLabelText } = render(<LoginForm />)
  const usernameInput = getByLabelText('Username')
  const passwordInput = getByLabelText('Password')

  expect(usernameInput).toBeRequired()
  expect(usernameInput).toHaveAttribute('name', 'username')
  expect(passwordInput).toBeRequired()
  expect(passwordInput).toHaveAttribute('name', 'password')
})

test('renders CustomForm with correct props', () => {
  const { getByTestId } = render(<LoginForm />)
  const customForm = getByTestId('custom-form')

  expect(customForm).toHaveTextContent(
    JSON.stringify({ method: 'post', action: '/auth/login' })
  )
})
