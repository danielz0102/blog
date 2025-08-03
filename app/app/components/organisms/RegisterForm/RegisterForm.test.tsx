import type { CustomFormProps } from '../CustomForm'
import type { PasswordFieldProps } from '~/components/molecules/PasswordField'

import { test, expect, vi } from 'vitest'
import { render } from '@testing-library/react'

import { RegisterForm } from '.'

vi.mock('../CustomForm', () => ({
  CustomForm: ({ children, ...props }: CustomFormProps) => (
    <div data-testid="custom-form">
      {JSON.stringify(props)}
      {children}
    </div>
  )
}))

vi.mock('~/components/molecules/UsernameField', () => ({
  UsernameField: () => <div data-testid="username-field"></div>
}))

vi.mock('~/components/molecules/PasswordField', () => ({
  PasswordField: (props: PasswordFieldProps) => (
    <div data-testid={`password-field${props.strong ? '--strong' : ''}`}>
      {JSON.stringify(props)}
    </div>
  )
}))

test('renders inputs with correct props', () => {
  const { getByTestId, queryByTestId } = render(<RegisterForm />)

  const passwordInput = getByTestId('password-field--strong')
  const confirmPasswordInput = getByTestId('password-field')

  expect(queryByTestId('username-field')).toBeInTheDocument()
  expect(passwordInput).toHaveTextContent(JSON.stringify({ strong: true }))
  expect(confirmPasswordInput).toHaveTextContent(
    JSON.stringify({ label: 'Confirm Password', name: 'confirmPassword' })
  )
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
