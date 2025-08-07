import type { Comment as CommentData } from '~/types'

import { test, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Comment from '.'

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

test('does not render a delete and update buttons if the user is not the author', () => {
  const comment = getComment()

  const { queryByRole } = render(<Comment comment={comment} userId={userId} />)

  expect(queryByRole('button', { name: /delete/i })).not.toBeInTheDocument()
  expect(queryByRole('button', { name: /update/i })).not.toBeInTheDocument()
})

test('shows delete and update buttons if the user is the author', () => {
  const comment = getComment(true)

  const { queryByRole } = render(<Comment comment={comment} userId={userId} />)

  expect(queryByRole('button', { name: /delete/i })).toBeInTheDocument()
  expect(queryByRole('button', { name: /update/i })).toBeInTheDocument()
})

test('calls onDeleteClick callback when delete button is clicked', async () => {
  const user = userEvent.setup()
  const comment = getComment(true)
  const onDeleteClick = vi.fn()
  
  const { getByRole } = render(
    <Comment comment={comment} userId={userId} onDeleteClick={onDeleteClick} />
  )
  const deleteButton = getByRole('button', { name: /delete/i })

  await user.click(deleteButton)

  expect(onDeleteClick).toHaveBeenCalledWith(comment)
})

test('calls onUpdateClick callback when update button is clicked', async () => {
  const user = userEvent.setup()
  const comment = getComment(true)
  const onUpdateClick = vi.fn()
  
  const { getByRole } = render(
    <Comment comment={comment} userId={userId} onUpdateClick={onUpdateClick} />
  )
  const updateButton = getByRole('button', { name: /update/i })

  await user.click(updateButton)

  expect(onUpdateClick).toHaveBeenCalledWith(comment)
})
