import { test, expect } from 'vitest'
import { render } from '@testing-library/react'

import { MemoryRouter } from 'react-router'

import { Header } from '.'

test('has a link to home', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  )

  const link = getByRole('link', { name: 'My Blog' })

  expect(link).toHaveAttribute('href', '/')
})

test('shows buttons for log in and register when not logged in', () => {
  const { queryByRole } = render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  )

  expect(queryByRole('button', { name: 'Log in' })).toBeInTheDocument()
  expect(queryByRole('button', { name: 'Register' })).toBeInTheDocument()
  expect(queryByRole('button', { name: 'Log out' })).not.toBeInTheDocument()
})
