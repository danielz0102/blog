import { test, expect, vi } from 'vitest'
import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { createRoutesStub, data } from 'react-router'

import { LoginForm } from '.'

type StubProps = {
  onSuccess?: () => void
  error?: string
}

const Stub = ({ onSuccess, error }: StubProps) => {
  const Component = createRoutesStub([
    {
      path: '/',
      Component: () => <LoginForm onSuccess={onSuccess} />
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

test('renders form correctly', () => {
  const { getByRole, getByLabelText, queryByRole } = render(<Stub />)

  const form = getByRole('form')
  const usernameInput = getByLabelText('Username')
  const passwordInput = getByLabelText('Password')

  expect(form).toHaveAttribute('method', 'post')
  expect(form).toHaveAttribute('action', '/auth/login')
  expect(usernameInput).toBeRequired()
  expect(usernameInput).toHaveAttribute('name', 'username')
  expect(passwordInput).toBeRequired()
  expect(passwordInput).toHaveAttribute('name', 'password')
  expect(queryByRole('button', { name: /Login/i })).toBeInTheDocument()
})

test('shows loading state', async () => {
  const user = userEvent.setup()
  const { getByRole, getByLabelText } = render(<Stub />)
  const usernameInput = getByLabelText('Username')
  const passwordInput = getByLabelText('Password')
  const button = getByRole('button', { name: /Login/i })

  await user.type(usernameInput, 'testuser')
  await user.type(passwordInput, 'password123')
  await user.click(button)

  expect(button).toHaveTextContent('Loading...')
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
  const button = getByRole('button', { name: /Login/i })

  await user.type(usernameInput, 'testuser')
  await user.type(passwordInput, 'Password123!')
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
  const button = getByRole('button', { name: /Login/i })

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
  const { getByRole, getByLabelText } = render(<Stub error="Error" />)
  const usernameInput = getByLabelText('Username')
  const passwordInput = getByLabelText('Password')
  const button = getByRole('button', { name: /Login/i })

  await user.type(usernameInput, 'testuser')
  await user.type(passwordInput, 'password123')
  await user.click(button)

  await waitFor(() => {
    expect(button).toHaveTextContent('Login')
  })

  expect(usernameInput).not.toHaveValue('')
  expect(passwordInput).not.toHaveValue('')
})

test('calls onSuccess callback on successful submission', async () => {
  const onSuccess = vi.fn()
  const user = userEvent.setup()
  const { getByRole, getByLabelText } = render(<Stub onSuccess={onSuccess} />)
  const usernameInput = getByLabelText('Username')
  const passwordInput = getByLabelText('Password')
  const button = getByRole('button', { name: /Login/i })

  await user.type(usernameInput, 'testuser')
  await user.type(passwordInput, 'password123')
  await user.click(button)

  await waitFor(() => {
    expect(onSuccess).toHaveBeenCalled()
  })
})
