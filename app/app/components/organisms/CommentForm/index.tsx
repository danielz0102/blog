import type { UUID } from 'crypto'

import { CustomForm } from '../CustomForm'
import CommentField from '~/components/molecules/CommentField'

export interface CommentFormProps {
  onSuccess?: () => void
  postId: UUID
}

export default function CommentForm({ postId, onSuccess }: CommentFormProps) {
  return (
    <CustomForm method="post" action={`/posts/${postId}`} onSuccess={onSuccess}>
      <CommentField />
    </CustomForm>
  )
}
