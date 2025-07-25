import { test, expect, vi } from 'vitest'
import { render } from '@testing-library/react'

import { createRoutesStub, useFetcher } from 'react-router'

import { CommentForm } from '.'

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router')
  return {
    ...actual,
    useFetcher: vi.fn(() => ({
      data: null,
      Form: ({ children, ...props }) => <form {...props}>{children}</form>
    }))
  }
})

const StubRouter = ({ postId = 1 }) => {
  const Component = createRoutesStub([
    {
      path: '/',
      Component: () => <CommentForm postId={postId} />
    }
  ])

  return <Component />
}

test('has a form to post a comment', () => {
  const { getByRole, queryByRole, getByPlaceholderText } = render(
    <StubRouter />
  )

  const form = getByRole('form')
  const textarea = getByPlaceholderText(/comment/i)

  expect(form).toHaveAttribute('method', 'post')
  expect(form).toHaveAttribute('action', '/posts/1/comment')
  expect(textarea).toHaveAttribute('name', 'content')
  expect(queryByRole('button', { name: 'Post' })).toBeInTheDocument()
})

test('shows errors', () => {
  vi.mocked(useFetcher).mockReturnValue({
    data: { error: 'Failed to post comment' },
    Form: ({ children, ...props }) => <form {...props}>{children}</form>
  })

  const { queryByText } = render(<StubRouter />)

  expect(queryByText(/failed to post comment/i)).toBeInTheDocument()
})
