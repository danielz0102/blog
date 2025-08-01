import { test, expect } from 'vitest'
import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { createRoutesStub } from 'react-router'

import { AuthForm } from '.'

const Stub = ({
  forLogin = true,
  error
}: {
  forLogin?: boolean
  error?: string
}) => {
  const Component = createRoutesStub([
    { path: '/', Component: () => <AuthForm forLogin={forLogin} /> },
    {
      path: '/login',
      action: () =>
        new Promise((resolve) =>
          setTimeout(() => resolve(error && { error }), 100)
        )
    }
  ])

  return <Component />
}

test('renders login form correctly', () => {
  const { getByRole, getByLabelText, queryByRole, queryByLabelText } = render(
    <Stub />
  )

  const form = getByRole('form')
  const usernameInput = getByLabelText('Username')
  const passwordInput = getByLabelText('Password')

  expect(form).toHaveAttribute('method', 'post')
  expect(form).toHaveAttribute('action', '/login')
  expect(usernameInput).toBeRequired()
  expect(usernameInput).toHaveAttribute('name', 'username')
  expect(passwordInput).toBeRequired()
  expect(passwordInput).toHaveAttribute('name', 'password')
  expect(queryByLabelText(/confirm password/i)).not.toBeInTheDocument()
  expect(queryByRole('button', { name: /Submit/i })).toBeInTheDocument()
})

test('renders registration form correctly', () => {
  const { getByRole, getByLabelText, queryByRole } = render(
    <Stub forLogin={false} />
  )

  const form = getByRole('form')
  const usernameInput = getByLabelText('Username')
  const passwordInput = getByLabelText('Password')
  const confirmPasswordInput = getByLabelText('Confirm Password')

  expect(form).toHaveAttribute('method', 'post')
  expect(form).toHaveAttribute('action', '/register')
  expect(usernameInput).toBeRequired()
  expect(usernameInput).toHaveAttribute('name', 'username')
  expect(passwordInput).toBeRequired()
  expect(passwordInput).toHaveAttribute('name', 'password')
  expect(passwordInput).toHaveAttribute(
    'pattern',
    '(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[^A-Za-z\\d]).{8,}'
  )
  expect(confirmPasswordInput).toBeRequired()
  expect(confirmPasswordInput).toHaveAttribute(
    'pattern',
    '(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[^A-Za-z\\d]).{8,}'
  )
  expect(queryByRole('button', { name: 'Submit' })).toBeInTheDocument()
})

test('shows loading state', async () => {
  const user = userEvent.setup()
  const { getByRole, getByLabelText } = render(<Stub />)
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
    <Stub error={errorMessage} />
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
