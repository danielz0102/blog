import type { UUID } from 'crypto'
import type { Comment } from '~/types'

import { useRef } from 'react'

import DeleteCommentDialog from '../DeleteCommentDialog'
import UpdateCommentDialog from '~/components/organisms/UpdateCommentDialog'

export type CommentProps = {
  postId: UUID
  comment: Comment
  userId?: UUID
}

export default function Comment({ postId, comment, userId }: CommentProps) {
  const deleteDialogRef = useRef<HTMLDialogElement>(null)
  const updateDialogRef = useRef<HTMLDialogElement>(null)

  const openDeleteDialog = () => {
    deleteDialogRef.current?.showModal()
  }

  const openUpdateDialog = () => {
    updateDialogRef.current?.showModal()
  }

  return (
    <>
      <article>
        <h3>{comment.user.username}</h3>
        <time dateTime={comment.createdAt}>{comment.createdAt}</time>
        <p>{comment.content}</p>
        {comment.user.id === userId && (
          <>
            <button onClick={openDeleteDialog}>Delete</button>
            <button onClick={openUpdateDialog}>Update</button>
          </>
        )}
      </article>
      <DeleteCommentDialog ref={deleteDialogRef} commentId={comment.id} />
      <UpdateCommentDialog
        ref={updateDialogRef}
        postId={postId}
        update={comment.content}
      />
    </>
  )
}
