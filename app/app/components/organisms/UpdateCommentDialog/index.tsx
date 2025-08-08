import type { Comment } from '~/types'

import { Dialog } from '~/components/molecules/Dialog'
import UpdateCommentForm from '../UpdateCommentForm'

export interface UpdateCommentDialogProps {
  ref: React.RefObject<HTMLDialogElement | null>
  comment: Pick<Comment, 'id' | 'content'>
}

export default function UpdateCommentDialog({
  ref,
  comment
}: UpdateCommentDialogProps) {
  const close = () => {
    ref.current?.close()
  }

  return (
    <Dialog ref={ref} className="min-w-2xs">
      <h3 className="mb-4 text-2xl font-bold">Update Comment</h3>
      <UpdateCommentForm onSuccess={close} comment={comment} />
    </Dialog>
  )
}
