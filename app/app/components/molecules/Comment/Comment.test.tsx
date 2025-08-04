import { test, expect } from 'vitest'
import { render } from '@testing-library/react'

import { Comment } from '.'
import type { Comment as CommentType } from '~/types'

test('renders comment with correct info', () => {
  const comment: CommentType = {
    id: crypto.randomUUID(),
    content: 'This is a test comment.',
    createdAt: '2023-10-01T12:00:00Z',
    user: {
      id: crypto.randomUUID(),
      username: 'testuser'
    }
  }

  const { queryByText } = render(<Comment comment={comment} />)

  expect(queryByText(comment.user.username)).toBeInTheDocument()
  expect(queryByText(comment.createdAt)).toBeInTheDocument()
  expect(queryByText(comment.content)).toBeInTheDocument()
})
