import { test, expect, vi } from 'vitest'
import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { createRoutesStub, data } from 'react-router'

import { CustomForm, type CustomFormProps } from '.'

interface StubProps extends CustomFormProps {
  error?: string | null
}

const Stub = ({ error = null, ...props }: Omit<StubProps, 'children'>) => {
  const Component = createRoutesStub([
    {
      path: '/',
      Component: () => (
        <CustomForm {...props}>
          <label htmlFor="username">
            Username
            <input type="text" name="username" placeholder="Username" />
          </label>
        </CustomForm>
      ),
      action: () =>
        new Promise((resolve) =>
          setTimeout(() => resolve(data({ error, success: !error })), 100)
        )
    }
  ])

  return <Component />
}

test('renders form with correct props', () => {
  const { getByRole } = render(
    <Stub method="post" action="/hola" aria-label="Custom Form" />
  )

  const form = getByRole('form')

  expect(form).toHaveAttribute('method', 'post')
  expect(form).toHaveAttribute('action', '/hola')
})

test('shows loading state', async () => {
  const user = userEvent.setup()
  const { getByRole, getByLabelText } = render(<Stub method="post" />)
  const usernameInput = getByLabelText('Username')
  const button = getByRole('button', { name: /Submit/i })

  await user.type(usernameInput, 'testuser')
  await user.click(button)

  expect(button).toHaveTextContent('Submitting...')
  expect(button).toBeDisabled()
})

test('shows errors', async () => {
  const user = userEvent.setup()
  const errorMessage = 'Invalid credentials'
  const { getByRole, getByLabelText, queryByText } = render(
    <Stub error={errorMessage} method="post" />
  )
  const usernameInput = getByLabelText('Username')
  const button = getByRole('button', { name: /Submit/i })

  await user.type(usernameInput, 'testuser')
  await user.click(button)

  await waitFor(() => {
    expect(queryByText(errorMessage)).toBeInTheDocument()
  })
})

test('cleans inputs on successful submission', async () => {
  const user = userEvent.setup()
  const { getByRole, getByLabelText } = render(<Stub method="post" />)
  const usernameInput = getByLabelText('Username')
  const button = getByRole('button', { name: /Submit/i })

  await user.type(usernameInput, 'testuser')
  await user.click(button)

  await waitFor(() => {
    expect(usernameInput).toHaveValue('')
  })
})

test('not cleans inputs when there is an error', async () => {
  const user = userEvent.setup()
  const { getByRole, getByLabelText } = render(
    <Stub error="Error" method="post" />
  )
  const usernameInput = getByLabelText('Username')
  const button = getByRole('button', { name: /Submit/i })

  await user.type(usernameInput, 'testuser')
  await user.click(button)

  await waitFor(() => {
    expect(button).toHaveTextContent('Submit')
  })

  expect(usernameInput).not.toHaveValue('')
})

test('calls onSuccess callback on successful submission', async () => {
  const onSuccess = vi.fn()
  const user = userEvent.setup()
  const { getByRole, getByLabelText } = render(
    <Stub onSuccess={onSuccess} method="post" />
  )
  const usernameInput = getByLabelText('Username')
  const button = getByRole('button', { name: /Submit/i })

  await user.type(usernameInput, 'testuser')
  await user.click(button)

  await waitFor(() => {
    expect(onSuccess).toHaveBeenCalled()
  })
})
