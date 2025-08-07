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

vi.mock('~/components/molecules/CommentField', () => ({
  default: ({ defaultValue = '' }) => (
    <div data-testid="comment-field">{defaultValue}</div>
  )
}))

const postId = crypto.randomUUID()

test('renders Custom Form with correct props', () => {
  const { getByTestId } = render(<CommentForm postId={postId} />)
  const form = getByTestId('custom-form-props')
  const props: CustomFormProps = JSON.parse(form.textContent || '{}')

  expect(props.method).toBe('post')
  expect(props.action).toBe(`/posts/${postId}`)
})

test('renders a CommentField', () => {
  const { queryByTestId } = render(<CommentForm postId={postId} />)

  expect(queryByTestId('comment-field')).toBeInTheDocument()
})
