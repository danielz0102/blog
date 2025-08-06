import type { UUID } from 'crypto'

import { Dialog } from '../Dialog'
import ActionButton from '~/components/atoms/ActionButton'

export interface DeleteCommentDialogProps {
  ref: React.RefObject<HTMLDialogElement | null>
  commentId: UUID
}

export default function DeleteCommentDialog({
  ref,
  commentId
}: DeleteCommentDialogProps) {
  const handleDelete = () => {
    ref.current?.close()
  }

  return (
    <Dialog ref={ref}>
      <h3>You are about to delete a comment</h3>
      <p>The comment cannot be restored</p>
      <ActionButton
        actionUrl={`/comments/${commentId}/delete`}
        onClick={handleDelete}
      >
        Delete
      </ActionButton>
    </Dialog>
  )
}
