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

vi.mock('~/components/molecules/UsernameField', () => ({
  UsernameField: () => <div data-testid="username-field"></div>
}))

vi.mock('~/components/molecules/PasswordField', () => ({
  PasswordField: () => <div data-testid="password-field"></div>
}))

test('renders correct inputs', () => {
  const { queryByTestId } = render(<LoginForm />)

  expect(queryByTestId('username-field')).toBeInTheDocument()
  expect(queryByTestId('password-field')).toBeInTheDocument()
})

test('renders CustomForm with correct props', () => {
  const { getByTestId } = render(<LoginForm />)
  const customForm = getByTestId('custom-form')

  expect(customForm).toHaveTextContent(
    JSON.stringify({ method: 'post', action: '/auth/login' })
  )
})
