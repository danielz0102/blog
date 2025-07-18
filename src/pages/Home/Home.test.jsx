import { expect, test, vi } from 'vitest'
import { render } from '@testing-library/react'

import { Home } from '.'
import { useAsync } from 'react-async-hook'

vi.mock('react-async-hook', () => ({
  useAsync: vi.fn()
}))

test('shows loading state while fetching posts', () => {
  useAsync.mockReturnValue({
    loading: true,
    error: null,
    result: null
  })

  const { getByText } = render(<Home />)

  expect(getByText(/loading/i)).toBeInTheDocument()
})

test('shows error message when fetching posts fails', () => {
  useAsync.mockReturnValue({
    loading: false,
    error: new Error(),
    result: null
  })

  const { getByText } = render(<Home />)

  expect(getByText(/something went wrong/i)).toBeInTheDocument()
})

test('renders posts when fetched successfully', () => {
  useAsync.mockReturnValue({
    loading: false,
    error: null,
    result: [
      { id: 1, title: 'Post 1', content: 'Content of post 1' },
      { id: 2, title: 'Post 2', content: 'Content of post 2' }
    ]
  })

  const { getByRole } = render(<Home />)

  expect(getByRole('link', { name: /post 1/i })).toHaveAttribute(
    'href',
    '/posts/1'
  )
  expect(getByRole('link', { name: /post 2/i })).toHaveAttribute(
    'href',
    '/posts/2'
  )
})
