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
    <Dialog ref={ref}>
      <UpdateCommentForm onSuccess={close} comment={comment} />
    </Dialog>
  )
}
