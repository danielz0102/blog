import { test, expect, vi } from 'vitest'
import { render } from '@testing-library/react'

import { useLoaderData, MemoryRouter } from 'react-router'

import { userLoader } from '@/lib/loaders/userLoader'
import { Post } from '.'

vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal()

  return {
    ...actual,
    useLoaderData: vi.fn(() => mockPost)
  }
})

vi.mock('@/lib/loaders/userLoader', () => ({
  userLoader: vi.fn(() => mockUser)
}))

vi.mock('@organisms/CommentForm', () => ({
  CommentForm: () => <h1 data-testid="comment-form">Comment Form</h1>
}))

const mockPost = {
  id: 1,
  title: 'Test Post',
  content: 'This is a test post content.',
  date: '2023-10-01',
  comments: [
    { id: 1, username: 'User1', content: 'Great post!', date: '2023-10-02' },
    {
      id: 2,
      username: 'User2',
      content: 'Thanks for sharing!',
      date: '2023-10-03'
    }
  ]
}
const mockUser = { id: 1, username: 'testuser' }
const useLoaderDataMock = vi.mocked(useLoaderData)
const userLoaderMock = vi.mocked(userLoader)

test('renders post data', () => {
  const { queryByText } = render(<Post />)

  expect(queryByText(mockPost.title)).toBeInTheDocument()
  expect(queryByText(mockPost.content)).toBeInTheDocument()
  expect(queryByText(mockPost.date)).toBeInTheDocument()
})

test('has a comments section', () => {
  const { queryByRole, queryByText } = render(<Post />)
  const comment1 = mockPost.comments[0]
  const comment2 = mockPost.comments[1]

  expect(
    queryByRole('heading', { name: /comments/i, level: 2 })
  ).toBeInTheDocument()
  expect(queryByText(comment1.username)).toBeInTheDocument()
  expect(queryByText(comment1.date)).toBeInTheDocument()
  expect(queryByText(comment1.content)).toBeInTheDocument()
  expect(queryByText(comment2.username)).toBeInTheDocument()
  expect(queryByText(comment2.date)).toBeInTheDocument()
  expect(queryByText(comment2.content)).toBeInTheDocument()
})

test('shows a message is there are no comments', () => {
  const emptyPost = { ...mockPost, comments: [] }
  useLoaderDataMock.mockReturnValueOnce(emptyPost)

  const { queryByText } = render(<Post />)

  expect(queryByText('No comments yet.')).toBeInTheDocument()
})

test('shows a link to login if user is not logged in', () => {
  userLoaderMock.mockReturnValueOnce(null)

  const { getByRole, queryByTestId } = render(
    <MemoryRouter>
      <Post />
    </MemoryRouter>
  )
  const loginLink = getByRole('link', { name: /log in to comment/i })

  expect(loginLink).toHaveAttribute('href', '/login')
  expect(queryByTestId('comment-form')).not.toBeInTheDocument()
})

test('renders CommentForm when user is logged in', () => {
  const { queryByTestId, queryByRole } = render(<Post />)

  expect(queryByTestId('comment-form')).toBeInTheDocument()
  expect(
    queryByRole('link', { name: /log in to comment/i })
  ).not.toBeInTheDocument()
})
