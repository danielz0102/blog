import { test, expect } from 'vitest'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { mockPosts } from 'tests/mocks/postsMock'
import { createRoutesStub } from 'react-router'

import PostSearchBar from '.'

const Stub = () => {
  const Component = createRoutesStub([
    { path: '/', Component: () => <PostSearchBar /> },
    {
      path: '/posts/search',
      loader: () => mockPosts
    }
  ])

  return <Component />
}

test('has an input to search posts', () => {
  const { getByRole } = render(<Stub />)

  const input = getByRole('searchbox')

  expect(input).toHaveAttribute('name', 'title')
})

test('shows links with posts found', async () => {
  const user = userEvent.setup()
  const { getByRole, queryByRole } = render(<Stub />)

  const input = getByRole('searchbox')

  await user.type(input, 'Post 1')

  expect(queryByRole('link', { name: mockPosts[0].title })).toBeInTheDocument()
})

test('clears the input when a link is clicked', async () => {
  const user = userEvent.setup()
  const { getByRole } = render(<Stub />)
  const input = getByRole('searchbox')
  await user.type(input, 'Post 1')
  const link = getByRole('link', { name: mockPosts[0].title })

  await user.click(link)

  expect(input).toHaveValue('')
  expect(link).not.toBeInTheDocument()
})
