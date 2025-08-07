import type { Comment } from '~/types'

import { useId } from 'react'

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
  const inputId = useId()

  return (
    <CustomForm
      onSuccess={onSuccess}
      method="post"
      action={`/comments/${comment.id}/update`}
    >
      <CommentField id={inputId} defaultValue={comment.content} />
    </CustomForm>
  )
}
