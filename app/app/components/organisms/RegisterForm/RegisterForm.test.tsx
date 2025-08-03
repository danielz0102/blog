import { test, expect, vi } from 'vitest'
import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { createRoutesStub, data } from 'react-router'
import { PASSWORD_PATTERN } from '~/lib/consts'

import { RegisterForm } from '.'

type StubProps = {
  onSuccess?: () => void
  error?: string
}

const Stub = ({ onSuccess, error }: StubProps) => {
  const Component = createRoutesStub([
    {
      path: '/',
      Component: () => <RegisterForm onSuccess={onSuccess} />
    },
    {
      path: '/auth/:action',
      action: () =>
        new Promise((resolve) =>
          setTimeout(() => resolve(data({ error, success: !error })), 100)
        )
    }
  ])

  return <Component />
}

test('renders registration form correctly', () => {
  const { getByRole, getByLabelText, queryByRole } = render(<Stub />)

  const form = getByRole('form')
  const usernameInput = getByLabelText('Username')
  const passwordInput = getByLabelText('Password')
  const confirmPasswordInput = getByLabelText('Confirm Password')

  expect(form).toHaveAttribute('method', 'post')
  expect(form).toHaveAttribute('action', '/auth/register')

  expect(usernameInput).toBeRequired()
  expect(usernameInput).toHaveAttribute('name', 'username')

  expect(passwordInput).toBeRequired()
  expect(passwordInput).toHaveAttribute('name', 'password')
  expect(passwordInput).toHaveAttribute('pattern', PASSWORD_PATTERN)

  expect(confirmPasswordInput).toBeRequired()
  expect(confirmPasswordInput).toHaveAttribute('name', 'confirmPassword')

  expect(queryByRole('button', { name: 'Submit' })).toBeInTheDocument()
})

test('shows loading state', async () => {
  const user = userEvent.setup()
  const { getByRole, getByLabelText } = render(<Stub />)
  const usernameInput = getByLabelText('Username')
  const passwordInput = getByLabelText('Password')
  const confirmPasswordInput = getByLabelText('Confirm Password')
  const button = getByRole('button', { name: /Submit/i })

  await user.type(usernameInput, 'testuser')
  await user.type(passwordInput, 'Password1!')
  await user.type(confirmPasswordInput, 'Password1!')
  await user.click(button)

  expect(button).toHaveTextContent('Submitting...')
  expect(button).toBeDisabled()
})

test('shows errors', async () => {
  const user = userEvent.setup()
  const errorMessage = 'Invalid credentials'
  const { getByRole, getByLabelText, queryByText } = render(
    <Stub error={errorMessage} />
  )
  const usernameInput = getByLabelText('Username')
  const passwordInput = getByLabelText('Password')
  const confirmPasswordInput = getByLabelText('Confirm Password')
  const button = getByRole('button', { name: /Submit/i })

  await user.type(usernameInput, 'testuser')
  await user.type(passwordInput, 'Password1!!')
  await user.type(confirmPasswordInput, 'Password1!!')
  await user.click(button)

  await waitFor(() => {
    expect(queryByText(errorMessage)).toBeInTheDocument()
  })
})

test('cleans inputs on successful submission', async () => {
  const user = userEvent.setup()
  const { getByRole, getByLabelText } = render(<Stub />)
  const usernameInput = getByLabelText('Username')
  const passwordInput = getByLabelText('Password')
  const confirmPasswordInput = getByLabelText('Confirm Password')
  const button = getByRole('button', { name: /Submit/i })

  await user.type(usernameInput, 'testuser')
  await user.type(passwordInput, 'Password1!')
  await user.type(confirmPasswordInput, 'Password1!')
  await user.click(button)

  await waitFor(() => {
    expect(usernameInput).toHaveValue('')
    expect(passwordInput).toHaveValue('')
    expect(confirmPasswordInput).toHaveValue('')
  })
})

test('not cleans inputs when there is an error', async () => {
  const user = userEvent.setup()
  const { getByRole, getByLabelText } = render(<Stub error="Error" />)
  const usernameInput = getByLabelText('Username')
  const passwordInput = getByLabelText('Password')
  const confirmPasswordInput = getByLabelText('Confirm Password')
  const button = getByRole('button', { name: /Submit/i })

  await user.type(usernameInput, 'testuser')
  await user.type(passwordInput, 'Password1!')
  await user.type(confirmPasswordInput, 'Password1!')
  await user.click(button)

  await waitFor(() => {
    expect(button).toHaveTextContent('Submit')
  })

  expect(usernameInput).not.toHaveValue('')
  expect(passwordInput).not.toHaveValue('')
  expect(confirmPasswordInput).not.toHaveValue('')
})

test('calls onSuccess callback on successful submission', async () => {
  const onSuccess = vi.fn()
  const user = userEvent.setup()
  const { getByRole, getByLabelText } = render(<Stub onSuccess={onSuccess} />)
  const usernameInput = getByLabelText('Username')
  const passwordInput = getByLabelText('Password')
  const confirmPasswordInput = getByLabelText('Confirm Password')
  const button = getByRole('button', { name: /Submit/i })

  await user.type(usernameInput, 'testuser')
  await user.type(passwordInput, 'Password1!')
  await user.type(confirmPasswordInput, 'Password1!')
  await user.click(button)

  await waitFor(() => {
    expect(onSuccess).toHaveBeenCalled()
  })
})

test('shows information about password strength when is for register', () => {
  const { queryByText } = render(<Stub />)

  expect(queryByText(/password must contain at least/i)).toBeInTheDocument()
  expect(queryByText(/8 characters/i)).toBeInTheDocument()
  expect(queryByText(/1 lowercase letter/i)).toBeInTheDocument()
  expect(queryByText(/1 uppercase letter/i)).toBeInTheDocument()
  expect(queryByText(/1 number/i)).toBeInTheDocument()
  expect(queryByText(/1 special character/i)).toBeInTheDocument()
})
