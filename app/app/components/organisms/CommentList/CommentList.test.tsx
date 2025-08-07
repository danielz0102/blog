import type { CommentProps } from '~/components/molecules/Comment'
import type { Comment } from '~/types'
import type { DeleteCommentDialogProps } from '~/components/molecules/DeleteCommentDialog'
import type { UpdateCommentDialogProps } from '~/components/organisms/UpdateCommentDialog'

import { test, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import CommentList from '.'

vi.mock('~/components/molecules/Comment', () => ({
  default: ({ comment, userId, onDeleteClick, onUpdateClick }: CommentProps) => (
    <div data-testid="comment" data-user-id={userId}>
      {JSON.stringify(comment)}
      <button 
        onClick={() => onDeleteClick?.(comment)}
        data-testid={`delete-button-${comment.id}`}
      >
        Delete
      </button>
      <button 
        onClick={() => onUpdateClick?.(comment)}
        data-testid={`update-button-${comment.id}`}
      >
        Update
      </button>
    </div>
  )
}))

vi.mock('~/components/molecules/DeleteCommentDialog', () => ({
  default: ({ ref, commentId }: DeleteCommentDialogProps) => (
    <dialog
      ref={ref}
      data-testid="delete-comment-dialog"
      data-comment-id={commentId}
    />
  )
}))

vi.mock('~/components/organisms/UpdateCommentDialog', () => ({
  default: ({ ref, comment }: UpdateCommentDialogProps) => (
    <dialog
      ref={ref}
      data-testid="update-dialog"
      data-comment-id={comment.id}
      data-comment-content={comment.content}
    />
  )
}))

const userLoggedId = crypto.randomUUID()
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
  const { queryAllByTestId } = render(
    <CommentList comments={comments} userId={userLoggedId} />
  )

  const commentsFound = queryAllByTestId('comment')

  expect(commentsFound).toHaveLength(comments.length)
  commentsFound.forEach((comment, index) => {
    expect(comment).toHaveTextContent(JSON.stringify(comments[index]))
    expect(comment).toHaveAttribute('data-user-id', userLoggedId)
  })
})

test('renders single delete and update dialogs when comments are present', () => {
  const { queryByTestId } = render(
    <CommentList comments={comments} userId={userLoggedId} />
  )

  // Should render dialogs from the beginning (but not visible yet)
  expect(queryByTestId('delete-comment-dialog')).toBeInTheDocument()
  expect(queryByTestId('update-dialog')).toBeInTheDocument()
})

test('renders delete dialog when delete button is clicked', async () => {
  const user = userEvent.setup()
  const { getByTestId, queryByTestId } = render(
    <CommentList comments={comments} userId={userLoggedId} />
  )

  // Click delete button for first comment
  const deleteButton = getByTestId(`delete-button-${comments[0].id}`)
  await user.click(deleteButton)

  // Should render single delete dialog with correct comment ID
  const deleteDialog = queryByTestId('delete-comment-dialog')
  expect(deleteDialog).toBeInTheDocument()
  expect(deleteDialog).toHaveAttribute('data-comment-id', comments[0].id)
})

test('renders update dialog when update button is clicked', async () => {
  const user = userEvent.setup()
  const { getByTestId, queryByTestId } = render(
    <CommentList comments={comments} userId={userLoggedId} />
  )

  // Click update button for second comment
  const updateButton = getByTestId(`update-button-${comments[1].id}`)
  await user.click(updateButton)

  // Should render single update dialog with correct comment data
  const updateDialog = queryByTestId('update-dialog')
  expect(updateDialog).toBeInTheDocument()
  expect(updateDialog).toHaveAttribute('data-comment-id', comments[1].id)
  expect(updateDialog).toHaveAttribute('data-comment-content', comments[1].content)
})
