import { expect, test, vi } from 'vitest'
import { render, waitFor } from '@testing-library/react'

import { createRoutesStub, useLoaderData } from 'react-router'
import { Home } from '.'

vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal()

  return {
    ...actual,
    useLoaderData: vi.fn(() => ({
      posts: new Promise((res) => {
        setTimeout(() => {
          res(postsMock)
        }, 100)
      })
    }))
  }
})

const useLoaderDataMock = vi.mocked(useLoaderData)

const postsMock = [
  { id: 1, title: 'Post 1', content: 'Content of post 1' },
  { id: 2, title: 'Post 2', content: 'Content of post 2' }
]

const StubRouter = () => {
  const Component = createRoutesStub([{ path: '/', Component: Home }])
  return <Component />
}

test('renders posts when fetched successfully', async () => {
  const { getByRole, getByText } = render(<StubRouter />)

  expect(getByText(/loading.../i)).toBeInTheDocument()
  await waitFor(() => {
    expect(getByRole('link', { name: /post 1/i })).toHaveAttribute(
      'href',
      '/posts/1'
    )
    expect(getByRole('link', { name: /post 2/i })).toHaveAttribute(
      'href',
      '/posts/2'
    )
  })
})

test('shows error message when fetching posts fails', async () => {
  useLoaderDataMock.mockReturnValueOnce({
    posts: Promise.reject(new Error('Failed to fetch posts'))
  })

  const { getByText } = render(<StubRouter />)

  await waitFor(() => {
    expect(getByText(/something went wrong/i)).toBeInTheDocument()
  })
})
