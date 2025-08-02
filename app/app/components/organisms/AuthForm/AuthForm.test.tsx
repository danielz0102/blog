import { test, expect, vi } from 'vitest'
import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { createRoutesStub, data } from 'react-router'
import { PASSWORD_PATTERN } from '~/lib/consts'

import { AuthForm } from '.'

type StubProps = {
  forLogin?: boolean
  onSuccess?: () => void
  error?: string
}

const Stub = ({ forLogin, error, onSuccess }: StubProps) => {
  const Component = createRoutesStub([
    {
      path: '/',
      Component: () => <AuthForm forLogin={forLogin} onSuccess={onSuccess} />
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

test('renders login form correctly', () => {
  const { getByRole, getByLabelText, queryByRole, queryByLabelText } = render(
    <Stub forLogin />
  )

  const form = getByRole('form')
  const usernameInput = getByLabelText('Username')
  const passwordInput = getByLabelText('Password')

  expect(form).toHaveAttribute('method', 'post')
  expect(form).toHaveAttribute('action', '/auth/login')
  expect(usernameInput).toBeRequired()
  expect(usernameInput).toHaveAttribute('name', 'username')
  expect(passwordInput).toBeRequired()
  expect(passwordInput).toHaveAttribute('name', 'password')
  expect(queryByLabelText(/confirm password/i)).not.toBeInTheDocument()
  expect(queryByRole('button', { name: /Submit/i })).toBeInTheDocument()
})

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
  expect(confirmPasswordInput).toHaveAttribute('pattern', PASSWORD_PATTERN)

  expect(queryByRole('button', { name: 'Submit' })).toBeInTheDocument()
})

test('shows loading state', async () => {
  const user = userEvent.setup()
  const { getByRole, getByLabelText } = render(<Stub forLogin />)
  const usernameInput = getByLabelText('Username')
  const passwordInput = getByLabelText('Password')
  const button = getByRole('button', { name: /Submit/i })

  await user.type(usernameInput, 'testuser')
  await user.type(passwordInput, 'password123')
  await user.click(button)

  expect(button).toHaveTextContent('Submitting...')
  expect(button).toBeDisabled()
})

test('shows errors', async () => {
  const user = userEvent.setup()
  const errorMessage = 'Invalid credentials'
  const { getByRole, getByLabelText, queryByText } = render(
    <Stub forLogin error={errorMessage} />
  )
  const usernameInput = getByLabelText('Username')
  const passwordInput = getByLabelText('Password')
  const button = getByRole('button', { name: /Submit/i })

  await user.type(usernameInput, 'testuser')
  await user.type(passwordInput, 'Password123!')
  await user.click(button)

  await waitFor(() => {
    expect(queryByText(errorMessage)).toBeInTheDocument()
  })
})

test('cleans inputs on successful submission', async () => {
  const user = userEvent.setup()
  const { getByRole, getByLabelText } = render(<Stub forLogin />)
  const usernameInput = getByLabelText('Username')
  const passwordInput = getByLabelText('Password')
  const button = getByRole('button', { name: /Submit/i })

  await user.type(usernameInput, 'testuser')
  await user.type(passwordInput, 'password123')
  await user.click(button)

  await waitFor(() => {
    expect(usernameInput).toHaveValue('')
    expect(passwordInput).toHaveValue('')
  })
})

test('not cleans inputs when there is an error', async () => {
  const user = userEvent.setup()
  const { getByRole, getByLabelText } = render(<Stub forLogin error="Error" />)
  const usernameInput = getByLabelText('Username')
  const passwordInput = getByLabelText('Password')
  const button = getByRole('button', { name: /Submit/i })

  await user.type(usernameInput, 'testuser')
  await user.type(passwordInput, 'password123')
  await user.click(button)

  await waitFor(() => {
    expect(button).toHaveTextContent('Submit')
  })

  expect(usernameInput).not.toHaveValue('')
  expect(passwordInput).not.toHaveValue('')
})

test('calls onSuccess callback on successful submission', async () => {
  const onSuccess = vi.fn()
  const user = userEvent.setup()
  const { getByRole, getByLabelText } = render(
    <Stub forLogin onSuccess={onSuccess} />
  )
  const usernameInput = getByLabelText('Username')
  const passwordInput = getByLabelText('Password')
  const button = getByRole('button', { name: /Submit/i })

  await user.type(usernameInput, 'testuser')
  await user.type(passwordInput, 'password123')
  await user.click(button)

  await waitFor(() => {
    expect(onSuccess).toHaveBeenCalled()
  })
})
