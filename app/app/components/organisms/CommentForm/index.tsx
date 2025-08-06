import type { UUID } from 'crypto'

import { CustomForm } from '../CustomForm'

export interface CommentFormProps {
  postId: UUID
}

export default function CommentForm({ postId }: CommentFormProps) {
  return (
    <CustomForm method="post" action={`/posts/${postId}`}>
      <label htmlFor="comment">Comment</label>
      <textarea
        id="comment"
        name="comment"
        placeholder="Write a comment..."
        required
      />
    </CustomForm>
  )
}
