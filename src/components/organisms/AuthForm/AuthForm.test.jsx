import { test, vi, expect } from 'vitest'
import { render } from '@testing-library/react'

import { createRoutesStub, useNavigation } from 'react-router'

import { AuthForm } from '.'

vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal()

  return {
    ...actual,
    useNavigation: vi.fn(() => ({ state: 'idle' })),
    useActionData: vi.fn(() => ({ error: 'Form failed' }))
  }
})

const useNavigationMock = vi.mocked(useNavigation)

const StubRouter = ({ signUp = false }) => {
  const Component = createRoutesStub([
    { path: '/', Component: () => <AuthForm signUp={signUp} /> }
  ])

  return <Component />
}

test('renders login form properly', () => {
  const { getByLabelText, getByRole, queryByLabelText } = render(<StubRouter />)

  const title = getByRole('heading', { name: 'Login' })
  const form = getByRole('form')
  const usernameInput = getByLabelText('Username')
  const passwordInput = getByLabelText('Password')
  const submitButton = getByRole('button', { name: 'Submit' })

  expect(title).toBeInTheDocument()
  expect(form).toHaveAttribute('method', 'post')
  expect(form).toHaveAttribute('action', '/login')
  expect(usernameInput).toHaveAttribute('name', 'username')
  expect(passwordInput).toHaveAttribute('name', 'password')
  expect(submitButton).toBeInTheDocument()
  expect(queryByLabelText('Confirm password')).not.toBeInTheDocument()
})

test('renders sign up form properly', () => {
  const { getByLabelText, getByRole } = render(<StubRouter signUp />)

  const title = getByRole('heading', { name: 'Sign Up' })
  const form = getByRole('form')
  const usernameInput = getByLabelText('Username')
  const passwordInput = getByLabelText('Password')
  const confirmPasswordInput = getByLabelText('Confirm password')

  expect(title).toBeInTheDocument()
  expect(form).toHaveAttribute('method', 'post')
  expect(form).toHaveAttribute('action', '/sign-up')
  expect(usernameInput).toHaveAttribute('name', 'username')
  expect(passwordInput).toHaveAttribute('name', 'password')
  expect(confirmPasswordInput).toHaveAttribute('name', 'confirmPassword')
})

test('shows loading state', () => {
  useNavigationMock.mockReturnValueOnce({ state: 'submitting' })
  const { getByRole } = render(<StubRouter />)

  const loginButton = getByRole('button', { name: 'Submitting...' })

  expect(loginButton).toBeDisabled()
})

test('shows error messages', () => {
  const { getByText } = render(<StubRouter />)

  expect(getByText('Form failed')).toBeInTheDocument()
})
