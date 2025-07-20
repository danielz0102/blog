import { test, expect, vi } from 'vitest'
import { render } from '@testing-library/react'

import { createRoutesStub, useNavigation, useActionData } from 'react-router'

import { Login } from '.'

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router')

  return {
    ...actual,
    useNavigation: vi.fn(() => ({ state: 'idle' })),
    useActionData: vi.fn(() => ({ error: 'Login failed' }))
  }
})

/** @type {import('vitest').Mock} **/
const useNavigationMock = useNavigation
/** @type {import('vitest').Mock} **/
const useActionDataMock = useActionData

const StubRouter = () => {
  const Component = createRoutesStub([
    { path: '/', Component: () => <div data-testid="home">Home</div> },
    { path: '/login', Component: Login, action: vi.fn() }
  ])

  return <Component initialEntries={['/login']} />
}

test('renders login form properly', () => {
  const { getByLabelText, getByRole } = render(<StubRouter />)

  const form = getByRole('form')
  const usernameInput = getByLabelText('Username')
  const passwordInput = getByLabelText('Password')

  expect(form).toHaveAttribute('method', 'post')
  expect(form).toHaveAttribute('action', '/login')
  expect(usernameInput).toHaveAttribute('name', 'username')
  expect(passwordInput).toHaveAttribute('name', 'password')
  expect(getByRole('button', { name: 'Login' })).toBeInTheDocument()
})

test('shows loading state', () => {
  useNavigationMock.mockReturnValueOnce({ state: 'submitting' })
  const { getByRole } = render(<StubRouter />)

  const loginButton = getByRole('button', { name: 'Logging in...' })

  expect(loginButton).toBeDisabled()
})

test('shows error messages', () => {
  useActionDataMock.mockReturnValueOnce({ error: 'Login failed' })
  const { getByText } = render(<StubRouter />)

  expect(getByText('Login failed')).toBeInTheDocument()
})
