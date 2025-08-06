import type { Comment as CommentData } from '~/types'

import { test, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Comment from '.'
import type { DeleteCommentDialogProps } from '../DeleteCommentDialog'

vi.mock('../DeleteCommentDialog', () => ({
  default: ({ ref, commentId }: DeleteCommentDialogProps) => (
    <dialog
      ref={ref}
      data-testid="delete-comment-dialog"
      data-comment-id={commentId}
    />
  )
}))

const userId = crypto.randomUUID()

const getComment = (isAuthor = false): CommentData => ({
  id: crypto.randomUUID(),
  content: 'This is a test comment.',
  createdAt: '2023-10-01T12:00:00Z',
  user: {
    id: isAuthor ? userId : crypto.randomUUID(),
    username: 'testuser'
  }
})

test('renders comment with correct info', () => {
  const comment = getComment()

  const { queryByText } = render(<Comment comment={comment} />)

  expect(queryByText(comment.user.username)).toBeInTheDocument()
  expect(queryByText(comment.createdAt)).toBeInTheDocument()
  expect(queryByText(comment.content)).toBeInTheDocument()
})

test('has a dialog to delete', () => {
  const comment = getComment(true)
  const { getByTestId } = render(<Comment comment={comment} userId={userId} />)

  const dialog = getByTestId('delete-comment-dialog')

  expect(dialog).not.toBeVisible()
  expect(dialog).toHaveAttribute('data-comment-id', comment.id)
})

test('does not render a delete button if the user is not the author', () => {
  const comment = getComment()

  const { queryByRole } = render(<Comment comment={comment} userId={userId} />)

  expect(queryByRole('button', { name: /delete/i })).not.toBeInTheDocument()
})

test('shows delete modal when delete button is clicked', async () => {
  const user = userEvent.setup()
  const comment = getComment(true)
  const { getByRole, getByTestId } = render(
    <Comment comment={comment} userId={userId} />
  )
  const deleteButton = getByRole('button', { name: /delete/i })

  await user.click(deleteButton)

  expect(getByTestId('delete-comment-dialog')).toBeVisible()
})
