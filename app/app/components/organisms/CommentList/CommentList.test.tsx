import type { Comment } from '~/types'

import { test, expect, vi } from 'vitest'
import { render } from '@testing-library/react'

import CommentList from '.'

vi.mock('~/components/molecules/Comment', () => ({
  default: ({ comment }: { comment: Comment }) => (
    <div data-testid="comment">{JSON.stringify(comment)}</div>
  )
}))

test('shows a message when there are no comments', () => {
  const { queryByText, queryAllByTestId } = render(
    <CommentList comments={[]} />
  )

  expect(
    queryByText('No comments yet. Be the first to comment!')
  ).toBeInTheDocument()

  expect(queryAllByTestId('comment')).toHaveLength(0)
})

test('renders a list of comments', () => {
  const comments: Comment[] = [
    {
      id: crypto.randomUUID(),
      user: { id: crypto.randomUUID(), username: 'user1' },
      content: 'Comment 1',
      createdAt: '2023-01-01T00:00:00Z'
    },
    {
      id: crypto.randomUUID(),
      user: { id: crypto.randomUUID(), username: 'user2' },
      content: 'Comment 2',
      createdAt: '2023-01-02T00:00:00Z'
    }
  ]

  const { queryAllByTestId } = render(<CommentList comments={comments} />)

  expect(queryAllByTestId('comment')).toHaveLength(2)
  expect(queryAllByTestId('comment')[0]).toHaveTextContent(
    JSON.stringify(comments[0])
  )
  expect(queryAllByTestId('comment')[1]).toHaveTextContent(
    JSON.stringify(comments[1])
  )
})
