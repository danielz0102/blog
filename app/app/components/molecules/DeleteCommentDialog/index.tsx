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
      <div className="flex flex-col">
        <h3 className="mb-2 text-2xl font-bold">
          You are about to delete a comment
        </h3>
        <p>The comment cannot be restored</p>
        <ActionButton
          className="mt-4 cursor-pointer self-center rounded bg-red-700 px-8 py-2 transition-opacity hover:opacity-50"
          actionUrl={`/comments/${commentId}/delete`}
          onClick={handleDelete}
        >
          Delete
        </ActionButton>
      </div>
    </Dialog>
  )
}
