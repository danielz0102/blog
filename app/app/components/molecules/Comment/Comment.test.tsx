import type { Comment as CommentData } from '~/types'
import type { DeleteCommentDialogProps } from '../DeleteCommentDialog'
import type { UpdateCommentDialogProps } from '~/components/organisms/UpdateCommentDialog'

import { test, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Comment from '.'

vi.mock('../DeleteCommentDialog', () => ({
  default: ({ ref, commentId }: DeleteCommentDialogProps) => (
    <dialog
      ref={ref}
      data-testid="delete-comment-dialog"
      data-comment-id={commentId}
    />
  )
}))

vi.mock('~/components/organisms/UpdateCommentDialog', () => ({
  default: ({ postId, update, ref }: UpdateCommentDialogProps) => (
    <dialog
      ref={ref}
      data-testid="update-dialog"
      data-post-id={postId}
      data-update={update}
    />
  )
}))

const userId = crypto.randomUUID()
const postId = crypto.randomUUID()

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

  const { queryByText } = render(<Comment comment={comment} postId={postId} />)

  expect(queryByText(comment.user.username)).toBeInTheDocument()
  expect(queryByText(comment.createdAt)).toBeInTheDocument()
  expect(queryByText(comment.content)).toBeInTheDocument()
})

test('has a DeleteCommentDialog', () => {
  const comment = getComment()
  const { getByTestId } = render(
    <Comment comment={comment} postId={postId} userId={userId} />
  )

  const dialog = getByTestId('delete-comment-dialog')

  expect(dialog).not.toBeVisible()
  expect(dialog).toHaveAttribute('data-comment-id', comment.id)
})

test('has an UpdateCommentDialog', () => {
  const comment = getComment()
  const { getByTestId } = render(
    <Comment comment={comment} postId={postId} userId={userId} />
  )

  const dialog = getByTestId('update-dialog')

  expect(dialog).not.toBeVisible()
  expect(dialog).toHaveAttribute('data-post-id', postId)
  expect(dialog).toHaveAttribute('data-update', comment.content)
})

test('does not render a delete and update buttons if the user is not the author', () => {
  const comment = getComment()

  const { queryByRole } = render(
    <Comment comment={comment} postId={postId} userId={userId} />
  )

  expect(queryByRole('button', { name: /delete/i })).not.toBeInTheDocument()
  expect(queryByRole('button', { name: /update/i })).not.toBeInTheDocument()
})

test('shows delete and update buttons if the user is the author', () => {
  const comment = getComment(true)

  const { queryByRole } = render(
    <Comment comment={comment} postId={postId} userId={userId} />
  )

  expect(queryByRole('button', { name: /delete/i })).toBeInTheDocument()
  expect(queryByRole('button', { name: /update/i })).toBeInTheDocument()
})

test('opens delete modal when delete button is clicked', async () => {
  const user = userEvent.setup()
  const comment = getComment(true)
  const { getByRole, getByTestId } = render(
    <Comment comment={comment} postId={postId} userId={userId} />
  )
  const deleteButton = getByRole('button', { name: /delete/i })

  await user.click(deleteButton)

  expect(getByTestId('delete-comment-dialog')).toBeVisible()
})

test('opens update modal when update button is clicked', async () => {
  const user = userEvent.setup()
  const comment = getComment(true)
  const { getByRole, getByTestId } = render(
    <Comment comment={comment} postId={postId} userId={userId} />
  )
  const updateButton = getByRole('button', { name: /update/i })

  await user.click(updateButton)

  expect(getByTestId('update-dialog')).toBeVisible()
})
