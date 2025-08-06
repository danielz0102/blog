import type { UUID } from 'crypto'

import { CustomForm } from '../CustomForm'
import CommentField from '~/components/molecules/CommentField'

export interface CommentFormProps {
  onSuccess?: () => void
  postId: UUID
  update?: string
}

export default function CommentForm({
  postId,
  update,
  onSuccess
}: CommentFormProps) {
  return (
    <CustomForm method="post" action={`/posts/${postId}`} onSuccess={onSuccess}>
      <CommentField defaultValue={update} />
      <input
        type="checkbox"
        name="update"
        id="update"
        readOnly
        checked={Boolean(update)}
        hidden
      />
    </CustomForm>
  )
}
