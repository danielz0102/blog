import { test, expect } from 'vitest'
import { render } from '@testing-library/react'

import { MemoryRouter } from 'react-router'
import { NotFound } from '.'

test('shows a 404 message', () => {
  const { getByText } = render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>
  )

  expect(getByText('404 - Page Not Found')).toBeInTheDocument()
  expect(
    getByText('The page you are looking for does not exist.')
  ).toBeInTheDocument()
})

test('has a link to the home page', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <NotFound />
    </MemoryRouter>
  )

  const link = getByRole('link', { name: 'Back to Home' })
  expect(link).toBeInTheDocument()
  expect(link.getAttribute('href')).toBe('/')
})
