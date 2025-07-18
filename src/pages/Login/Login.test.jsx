import { test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Login } from '.'
import { UserContext } from '@providers/contexts'
import { UserProvider } from '@providers/UserProvider'
import { ApiError } from '@/lib/customErrors/ApiError'

test('renders a form to login', () => {
  const { getByLabelText, getByRole } = render(
    <UserProvider>
      <Login />
    </UserProvider>
  )

  expect(getByRole('form')).toBeInTheDocument()
  expect(getByLabelText('Username')).toBeInTheDocument()
  expect(getByLabelText('Password')).toBeInTheDocument()
  expect(getByRole('button', { name: 'Login' })).toBeInTheDocument()
})

test('calls login function on form submission', async () => {
  const { mockLogin, mockUsername, mockPassword } = await submit()

  expect(mockLogin).toHaveBeenCalledWith({
    username: mockUsername,
    password: mockPassword
  })
})

test('redirects to home on successful login', async () => {
  await submit()
  expect(window.location.pathname).toBe('/')
})

test('displays error message on unexpected error', async () => {
  await submit({
    mockLogin: vi.fn(() => Promise.reject(new Error('Login failed')))
  })

  expect(
    screen.getByText('An unexpected error occurred. Please, try again later.')
  ).toBeInTheDocument()
})

test('displays errors that come from the API', async () => {
  const apiError = new ApiError('Invalid credentials', 401, {
    error: 'Username or password is incorrect'
  })

  await submit({
    mockLogin: vi.fn(() => Promise.reject(apiError))
  })

  expect(
    screen.getByText('Username or password is incorrect')
  ).toBeInTheDocument()
})

async function submit({
  mockUsername = 'testuser',
  mockPassword = 'Password1!',
  mockLogin = vi.fn(() => Promise.resolve())
} = {}) {
  const user = userEvent.setup()
  const { getByLabelText, getByRole } = render(
    <UserContext value={{ login: mockLogin }}>
      <Login />
    </UserContext>
  )

  const usernameInput = getByLabelText('Username')
  const passwordInput = getByLabelText('Password')
  const loginButton = getByRole('button', { name: 'Login' })

  await user.type(usernameInput, mockUsername)
  await user.type(passwordInput, mockPassword)
  await user.click(loginButton)

  return { mockLogin, mockUsername, mockPassword }
}
