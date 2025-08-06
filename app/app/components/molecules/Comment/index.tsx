import type { UUID } from 'crypto'
import type { Comment } from '~/types'

import { useRef } from 'react'

import DeleteCommentDialog from '../DeleteCommentDialog'

export type CommentProps = {
  comment: Comment
  userId?: UUID
}

export default function Comment({ comment, userId }: CommentProps) {
  const deleteDialogRef = useRef<HTMLDialogElement>(null)

  const openDeleteDialog = () => {
    deleteDialogRef.current?.showModal()
  }

  return (
    <>
      <article>
        <h3>{comment.user.username}</h3>
        <time dateTime={comment.createdAt}>{comment.createdAt}</time>
        <p>{comment.content}</p>
        {comment.user.id === userId && (
          <button onClick={openDeleteDialog}>Delete</button>
        )}
      </article>
      <DeleteCommentDialog ref={deleteDialogRef} commentId={comment.id} />
    </>
  )
}
