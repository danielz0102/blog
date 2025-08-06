import type { DialogProps } from '../Dialog'
import type { ActionButtonProps } from '~/components/atoms/ActionButton'

import { test, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { useRef } from 'react'

import DeleteCommentDialog from '.'

vi.mock('../Dialog', () => ({
  Dialog: ({ ref, children }: DialogProps) => (
    <dialog ref={ref}>{children}</dialog>
  )
}))

vi.mock('~/components/atoms/ActionButton', () => ({
  default: ({ children, actionUrl, onClick = () => {} }: ActionButtonProps) => (
    <>
      <button data-action-url={actionUrl} onClick={onClick}>
        {children}
      </button>
    </>
  )
}))

const commentId = crypto.randomUUID()

const DialogWrapper = () => {
  const ref = useRef<HTMLDialogElement>(null)

  return (
    <>
      <DeleteCommentDialog ref={ref} commentId={commentId} />
      <button onClick={() => ref.current?.showModal()}>Open</button>
    </>
  )
}

test('renders a Dialog to confirm deletion', () => {
  const { getByRole, queryByRole } = render(<DialogWrapper />)

  expect(getByRole('dialog', { hidden: true })).toBeInTheDocument()
  expect(
    queryByRole('heading', {
      name: /you are about to delete a comment/i,
      hidden: true
    })
  ).toBeInTheDocument()

  const button = getByRole('button', { name: /delete/i, hidden: true })

  expect(button).toHaveAttribute(
    'data-action-url',
    `/comments/${commentId}/delete`
  )
})

test('closes when the button is clicked', async () => {
  const user = userEvent.setup()
  const { getByRole } = render(<DialogWrapper />)
  const openButton = getByRole('button', { name: /open/i })
  const dialog = getByRole('dialog', { hidden: true })
  const deleteButton = getByRole('button', { name: /delete/i, hidden: true })

  await user.click(openButton)

  expect(dialog).toBeVisible()

  await user.click(deleteButton)

  expect(dialog).not.toBeVisible()
})
