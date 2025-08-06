import type { CommentProps } from '~/components/molecules/Comment'
import type { Comment } from '~/types'

import { test, expect, vi } from 'vitest'
import { render } from '@testing-library/react'

import CommentList from '.'

vi.mock('~/components/molecules/Comment', () => ({
  default: ({ comment, userId, postId }: CommentProps) => (
    <div data-testid="comment" data-user-id={userId} data-post-id={postId}>
      {JSON.stringify(comment)}
    </div>
  )
}))

const userId = crypto.randomUUID()
const postId = crypto.randomUUID()

test('shows a message when there are no comments', () => {
  const { queryByText, queryAllByTestId } = render(
    <CommentList postId={postId} comments={[]} />
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
  const { queryAllByTestId } = render(
    <CommentList postId={postId} comments={comments} userId={userId} />
  )

  const commentsFound = queryAllByTestId('comment')

  expect(commentsFound).toHaveLength(comments.length)
  commentsFound.forEach((comment, index) => {
    expect(comment).toHaveTextContent(JSON.stringify(comments[index]))
    expect(comment).toHaveAttribute('data-user-id', userId)
    expect(comment).toHaveAttribute('data-post-id', postId)
  })
})
