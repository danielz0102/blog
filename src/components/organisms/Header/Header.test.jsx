import { expect, test } from 'vitest'
import { render } from '@testing-library/react'

import { Header } from '.'
import { UserProvider } from '@providers/UserProvider'
import { UserContext } from '@providers/contexts'

test('renders a header', () => {
  const { getByRole } = render(
    <UserProvider>
      <Header />
    </UserProvider>,
  )

  expect(getByRole('banner')).toBeInTheDocument()
})

test('has a link to the home page', () => {
  const { getAllByRole } = render(
    <UserProvider>
      <Header />
    </UserProvider>,
  )
  const homeLink = getAllByRole('link').find(
    (link) => link.getAttribute('href') === '/',
  )

  expect(homeLink).toBeInTheDocument()
})

test('has the correct links when the user is not logged in', () => {
  const { getByRole, queryByRole } = render(
    <UserContext value={{ user: null }}>
      <Header />
    </UserContext>,
  )

  expect(getByRole('link', { name: /login/i })).toHaveAttribute(
    'href',
    '/login',
  )
  expect(getByRole('link', { name: /sign up/i })).toHaveAttribute(
    'href',
    '/sign-up',
  )
  expect(queryByRole('link', { name: /logout/i })).not.toBeInTheDocument()
})

test('has the correct links when the user is logged in', () => {
  const { getByRole, queryByRole } = render(
    <UserContext value={{ user: { name: 'John Doe' } }}>
      <Header />
    </UserContext>,
  )

  expect(getByRole('link', { name: /logout/i })).toHaveAttribute(
    'href',
    '/logout',
  )
  expect(queryByRole('link', { name: /login/i })).not.toBeInTheDocument()
  expect(queryByRole('link', { name: /sign up/i })).not.toBeInTheDocument()
})
