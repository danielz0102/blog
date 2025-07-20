import { expect, test, vi } from 'vitest'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { MemoryRouter, useLoaderData } from 'react-router'

import { Header } from '.'
import { UserProvider } from '@providers/UserProvider'
import { UserContext } from '@providers/contexts'

vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal()

  return {
    ...actual,
    useLoaderData: vi.fn(() => ({ name: 'John Doe' }))
  }
})

/** @type {import('vitest').Mock} **/
const useLoaderDataMock = useLoaderData

test('renders a header', async () => {
  const { getByRole } = render(
    <MemoryRouter>
      <UserProvider>
        <Header />
      </UserProvider>
    </MemoryRouter>
  )

  expect(getByRole('banner')).toBeInTheDocument()
})

test('has a link to the home page', () => {
  const { getAllByRole } = render(
    <MemoryRouter>
      <UserProvider>
        <Header />
      </UserProvider>
    </MemoryRouter>
  )
  const homeLink = getAllByRole('link').find(
    (link) => link.getAttribute('href') === '/'
  )

  expect(homeLink).toBeInTheDocument()
})

test('has the correct links when the user is not logged in', () => {
  useLoaderDataMock.mockReturnValueOnce(null)
  const { getByRole, queryByRole } = render(
    <MemoryRouter>
      <UserProvider>
        <Header />
      </UserProvider>
    </MemoryRouter>
  )

  expect(getByRole('link', { name: /log in/i })).toHaveAttribute(
    'href',
    '/login'
  )
  expect(getByRole('link', { name: /sign up/i })).toHaveAttribute(
    'href',
    '/sign-up'
  )
  expect(queryByRole('link', { name: /log out/i })).not.toBeInTheDocument()
})

test('has the correct links when the user is logged in', () => {
  const { getByRole, queryByRole } = render(
    <MemoryRouter>
      <UserProvider>
        <Header />
      </UserProvider>
    </MemoryRouter>
  )

  expect(getByRole('button', { name: /log out/i })).toBeInTheDocument()
  expect(queryByRole('link', { name: /log in/i })).not.toBeInTheDocument()
  expect(queryByRole('link', { name: /sign up/i })).not.toBeInTheDocument()
})

test('closes session on logout button click', async () => {
  const user = userEvent.setup()
  const mockLogout = vi.fn()
  const { getByRole } = render(
    <MemoryRouter>
      <UserContext value={{ logout: mockLogout }}>
        <Header />
      </UserContext>
    </MemoryRouter>
  )

  await user.click(getByRole('button', { name: /log out/i }))

  expect(mockLogout).toHaveBeenCalled()
})
