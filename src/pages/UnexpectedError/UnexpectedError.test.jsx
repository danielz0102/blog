import { test, expect } from 'vitest'
import { render } from '@testing-library/react'

import { MemoryRouter } from 'react-router'

import { UnexpectedError } from '.'

test('has a generic message', () => {
  const { getByText } = render(
    <MemoryRouter>
      <UnexpectedError />
    </MemoryRouter>
  )

  expect(
    getByText('An unexpected error occurred. Please try again later.')
  ).toBeInTheDocument()
})

test('has a link to home', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <UnexpectedError />
    </MemoryRouter>
  )

  expect(getByRole('link', { name: 'Go to Home' })).toHaveAttribute('href', '/')
})
