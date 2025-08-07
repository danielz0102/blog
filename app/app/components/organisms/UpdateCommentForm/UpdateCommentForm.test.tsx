import { test, expect, vi } from 'vitest'
import { render } from '@testing-library/react'

import UpdateCommentForm from '.'
import type { CustomFormProps } from '../CustomForm'

vi.mock('../CustomForm', () => ({
  CustomForm: ({ children, ...props }: CustomFormProps) => (
    <>
      <div data-testid="custom-form">{JSON.stringify(props)}</div>
      {children}
    </>
  )
}))

vi.mock('~/components/molecules/CommentField', () => ({
  default: ({ defaultValue = '' }) => (
    <div data-testid="comment-field">{defaultValue}</div>
  )
}))

const mockComment = {
  id: crypto.randomUUID(),
  content: 'This is a comment'
}

test('renders CustomForm with correct props', () => {
  const { getByTestId } = render(<UpdateCommentForm comment={mockComment} />)

  const customForm = getByTestId('custom-form')
  const props = JSON.parse(customForm.textContent || '{}')

  expect(props).toEqual({
    method: 'post',
    action: `/comments/${mockComment.id}/update`
  })
})

test('has a CommentField with the comment content as default value', () => {
  const { getByTestId } = render(<UpdateCommentForm comment={mockComment} />)

  const commentField = getByTestId('comment-field')
  expect(commentField).toHaveTextContent(mockComment.content)
})
