import type { UUID } from 'crypto'

import { Dialog } from '~/components/molecules/Dialog'
import CommentForm from '../CommentForm'

export interface UpdateCommentDialogProps {
  ref: React.RefObject<HTMLDialogElement | null>
  postId: UUID
  update: string
}

export default function UpdateCommentDialog({
  ref,
  postId,
  update
}: UpdateCommentDialogProps) {
  const close = () => {
    ref.current?.close()
  }

  return (
    <Dialog ref={ref}>
      <CommentForm postId={postId} update={update} onSuccess={close} />
    </Dialog>
  )
}
