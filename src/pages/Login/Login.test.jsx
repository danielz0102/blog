import { test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { MemoryRouter } from 'react-router'

import { Login } from '.'
import { login } from '@services/auth'

vi.mock('@services/auth', () => ({
  login: vi.fn(() => Promise.resolve()),
}))

test('renders a form to login', () => {
  render(<Login />)

  expect(screen.getByRole('form')).toBeInTheDocument()
  expect(screen.getByLabelText('Username')).toBeInTheDocument()
  expect(screen.getByLabelText('Password')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument()
})

test('redirects to home on successful login', async () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>,
  )
  const user = userEvent.setup()
  const username = 'testuser'
  const password = 'password123'
  const usernameInput = screen.getByLabelText('Username')
  const passwordInput = screen.getByLabelText('Password')
  const loginButton = screen.getByRole('button', { name: 'Login' })

  await user.type(usernameInput, username)
  await user.type(passwordInput, password)
  await user.click(loginButton)

  expect(login).toHaveBeenCalledWith({ username, password })
  expect(window.location.pathname).toBe('/')
})
