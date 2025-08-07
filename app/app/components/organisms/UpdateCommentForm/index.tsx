import type { Comment } from '~/types'

import { CustomForm } from '../CustomForm'
import CommentField from '~/components/molecules/CommentField'

export interface UpdateCommentFormProps {
  onSuccess?: () => void
  comment: Pick<Comment, 'id' | 'content'>
}

export default function UpdateCommentForm({
  comment,
  onSuccess
}: UpdateCommentFormProps) {
  return (
    <CustomForm
      onSuccess={onSuccess}
      method="post"
      action={`/comments/${comment.id}/update`}
    >
      <CommentField defaultValue={comment.content} />
    </CustomForm>
  )
}
