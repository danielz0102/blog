import { test, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { createRoutesStub } from 'react-router'

import { Header } from '.'

vi.mock('../AuthForm', () => ({
  AuthForm: ({ forLogin = false }: { forLogin?: boolean }) => (
    <div data-testid={forLogin ? 'login-form' : 'register-form'}></div>
  )
}))

const logoutAction = vi.fn()

const Stub = ({ isLoggedIn = false }: { isLoggedIn?: boolean }) => {
  const Component = createRoutesStub([
    { path: '/', Component: () => <Header isLoggedIn={isLoggedIn} /> },
    { path: '/logout', action: logoutAction }
  ])

  return <Component />
}

test('has a link to home', () => {
  const { getByRole } = render(<Stub />)

  const link = getByRole('link', { name: 'My Blog' })

  expect(link).toHaveAttribute('href', '/')
})

test('has buttons for show log in and register dialogs when not logged in', async () => {
  const user = userEvent.setup()
  const { getByRole, queryByRole, queryByTestId } = render(<Stub />)

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

test('only has a button to log out when logged in', async () => {
  const user = userEvent.setup()
  const { getByRole, queryByRole } = render(<Stub isLoggedIn={true} />)

  expect(queryByRole('button', { name: 'Log in' })).not.toBeInTheDocument()
  expect(queryByRole('button', { name: 'Register' })).not.toBeInTheDocument()

  await user.click(getByRole('button', { name: 'Log out' }))

  expect(logoutAction).toHaveBeenCalled()
})
