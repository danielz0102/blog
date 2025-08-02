import { test, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { MemoryRouter } from 'react-router'

import { Header } from '.'

vi.mock('../AuthForm', () => ({
  AuthForm: ({ forLogin = false }: { forLogin?: boolean }) => (
    <div data-testid={forLogin ? 'login-form' : 'register-form'}></div>
  )
}))

test('has a link to home', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  )

  const link = getByRole('link', { name: 'My Blog' })

  expect(link).toHaveAttribute('href', '/')
})

test('has buttons for show log in and register dialogs when not logged in', async () => {
  const user = userEvent.setup()
  const { getByRole, queryByRole, queryByTestId } = render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  )

  expect(queryByTestId('login-form')).not.toBeVisible()
  expect(queryByTestId('register-form')).not.toBeVisible()
  expect(queryByRole('button', { name: 'Log out' })).not.toBeInTheDocument()

  const loginButton = getByRole('button', { name: 'Log in' })
  const registerButton = getByRole('button', { name: 'Register' })

  await user.click(loginButton)
  await user.click(registerButton)

  expect(queryByTestId('login-form')).toBeVisible()
  expect(queryByTestId('register-form')).toBeVisible()
})

test('has a button to log out when logged in', () => {
  const { getByRole, queryByRole } = render(
    <MemoryRouter>
      <Header isLoggedIn />
    </MemoryRouter>
  )

  expect(queryByRole('button', { name: 'Log in' })).not.toBeInTheDocument()
  expect(queryByRole('button', { name: 'Register' })).not.toBeInTheDocument()

  const logoutButton = getByRole('button', { name: 'Log out' })
})
