import type { CommentFormProps } from '../CommentForm'
import type { DialogProps } from '~/components/molecules/Dialog'

import { test, expect, vi } from 'vitest'
import { render } from '@testing-library/react'

import { useRef } from 'react'

import UpdateCommentDialog from '.'

vi.mock('~/components/molecules/Dialog', () => ({
  Dialog: ({ children, ref }: DialogProps) => (
    <dialog ref={ref}>{children}</dialog>
  )
}))

vi.mock('../UpdateCommentForm', () => ({
  default: (props: CommentFormProps) => (
    <form aria-label="Comment Form">{JSON.stringify(props)}</form>
  )
}))

const mockComment = {
  id: crypto.randomUUID(),
  content: 'This is a comment'
}

const DialogWrapper = () => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  return <UpdateCommentDialog ref={dialogRef} comment={mockComment} />
}

test('renders a dialog', () => {
  const { queryByRole } = render(<DialogWrapper />)

  expect(queryByRole('dialog', { hidden: true })).toBeInTheDocument()
})

test('renders UpdateCommentForm with correct props', () => {
  const { getByRole } = render(<DialogWrapper />)

  const form = getByRole('form', { hidden: true })
  const props = JSON.parse(form.textContent || '{}')

  expect(props).toEqual({ comment: mockComment })
})
