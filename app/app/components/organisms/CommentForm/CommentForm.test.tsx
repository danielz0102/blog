import type { CustomFormProps } from '../CustomForm'

import { test, expect, vi } from 'vitest'
import { render } from '@testing-library/react'

import CommentForm from '.'

vi.mock('../CustomForm', () => ({
  CustomForm: ({ children, ...props }: CustomFormProps) => (
    <>
      <div data-testid="custom-form-props">{JSON.stringify(props)}</div>
      {children}
    </>
  )
}))

const postId = crypto.randomUUID()

test('renders Custom Form with correctly', () => {
  const { getByTestId, getByLabelText } = render(
    <CommentForm postId={postId} />
  )
  const form = getByTestId('custom-form-props')
  const props = JSON.parse(form.textContent || '{}')
  const textarea = getByLabelText('Comment')

  expect(props.method).toBe('post')
  expect(props.action).toBe(`/posts/${postId}`)

  expect(textarea).toBeRequired()
  expect(textarea).toHaveAttribute('name', 'comment')
})
