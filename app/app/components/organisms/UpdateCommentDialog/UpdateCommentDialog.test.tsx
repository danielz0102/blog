import type { CommentFormProps } from '../CommentForm'

import { test, expect, vi } from 'vitest'
import { render } from '@testing-library/react'

import { useRef } from 'react'

import UpdateCommentDialog from '.'
import type { DialogProps } from '~/components/molecules/Dialog'

vi.mock('~/components/molecules/Dialog', () => ({
  Dialog: ({ children, ref }: DialogProps) => (
    <dialog ref={ref}>{children}</dialog>
  )
}))

vi.mock('~/components/organisms/CommentForm', () => ({
  default: (props: CommentFormProps) => (
    <form aria-label="Comment Form">{JSON.stringify(props)}</form>
  )
}))

const postId = crypto.randomUUID()
const update = 'This is an update comment'

const DialogWrapper = () => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  return <UpdateCommentDialog ref={dialogRef} postId={postId} update={update} />
}

test('renders a dialog', () => {
  const { queryByRole } = render(<DialogWrapper />)

  expect(queryByRole('dialog', { hidden: true })).toBeInTheDocument()
})

test('renders CommentForm with correct props', () => {
  const { getByRole } = render(<DialogWrapper />)
  const propsExpected: CommentFormProps = {
    postId,
    update
  }

  const form = getByRole('form', { hidden: true })
  const props = JSON.parse(form.textContent || '{}')

  expect(props).toEqual(propsExpected)
})
