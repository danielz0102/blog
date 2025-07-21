import { expect, test, vi } from 'vitest'
import { render } from '@testing-library/react'

import { useLoaderData, createRoutesStub } from 'react-router'

import { Header } from '.'

vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal()

  return {
    ...actual,
    useLoaderData: vi.fn(() => ({ name: 'John Doe' }))
  }
})

/** @type {import('vitest').Mock} **/
const useLoaderDataMock = useLoaderData

const StubRouter = () => {
  const Component = createRoutesStub([{ path: '/', Component: Header }])

  return <Component initialEntries={['/']} />
}

test('renders a header', async () => {
  const { getByRole } = render(<StubRouter />)

  expect(getByRole('banner')).toBeInTheDocument()
})

test('has a link to the home page', () => {
  const { getAllByRole } = render(<StubRouter />)
  const homeLink = getAllByRole('link').find(
    (link) => link.getAttribute('href') === '/'
  )

  expect(homeLink).toBeInTheDocument()
})

test('has the correct links when the user is not logged in', () => {
  useLoaderDataMock.mockReturnValueOnce(null)
  const { getByRole, queryByRole } = render(<StubRouter />)

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
  const { getByRole, queryByRole } = render(<StubRouter />)

  expect(getByRole('button', { name: /log out/i })).toBeInTheDocument()
  expect(queryByRole('link', { name: /log in/i })).not.toBeInTheDocument()
  expect(queryByRole('link', { name: /sign up/i })).not.toBeInTheDocument()
})

test('has a form to log out', async () => {
  const { getByRole } = render(<StubRouter />)

  const form = getByRole('form')

  expect(form).toBeInTheDocument()
  expect(form).toHaveAttribute('method', 'post')
  expect(form).toHaveAttribute('action', '/logout')
  expect(getByRole('button', { name: /log out/i })).toBeInTheDocument()
})
