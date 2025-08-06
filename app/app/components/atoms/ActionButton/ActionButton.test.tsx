import { test, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { createRoutesStub } from 'react-router'

import ActionButton, { type ActionButtonProps } from '.'

const actionUrl = 'https://example.com'
const action = vi.fn()
const onClick = vi.fn()

const Stub = ({
  children,
  className
}: Omit<ActionButtonProps, 'actionUrl'>) => {
  const Component = createRoutesStub([
    {
      path: '/',
      Component: () => (
        <ActionButton
          actionUrl={actionUrl}
          className={className}
          onClick={onClick}
        >
          {children}
        </ActionButton>
      )
    },
    { path: actionUrl, action: action }
  ])

  return <Component />
}

test('renders a button', () => {
  const { queryByRole } = render(<Stub>Click me</Stub>)

  expect(queryByRole('button', { name: 'Click me' })).toBeInTheDocument()
})

test('calls action on click', async () => {
  const user = userEvent.setup()
  const { getByRole } = render(<Stub>Click me</Stub>)
  const button = getByRole('button', { name: 'Click me' })

  await user.click(button)

  expect(action).toHaveBeenCalled()
})

test('pass className prop to the button', () => {
  const { getByRole } = render(<Stub className="custom-class">Click me</Stub>)

  const button = getByRole('button', { name: 'Click me' })

  expect(button).toHaveClass('custom-class')
})

test('calls onClick when button is clicked', async () => {
  const user = userEvent.setup()
  const { getByRole } = render(<Stub>Click me</Stub>)
  const button = getByRole('button', { name: 'Click me' })

  await user.click(button)

  expect(onClick).toHaveBeenCalled()
})
