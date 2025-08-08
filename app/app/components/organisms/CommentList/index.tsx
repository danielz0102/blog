import type { Comment } from '~/types'
import type { UUID } from 'crypto'

import { useRef, useState } from 'react'

import PostComment from '~/components/molecules/Comment'
import DeleteCommentDialog from '~/components/molecules/DeleteCommentDialog'
import UpdateCommentDialog from '~/components/organisms/UpdateCommentDialog'
import Info from '~/components/molecules/Info'

export interface CommentListProps {
  comments: Comment[]
  userId?: UUID
}

export default function CommentList({ comments, userId }: CommentListProps) {
  const [currentComment, setCurrentComment] = useState<Comment | null>(null)
  const deleteDialogRef = useRef<HTMLDialogElement>(null)
  const updateDialogRef = useRef<HTMLDialogElement>(null)

  const handleDeleteClick = (comment: Comment) => {
    setCurrentComment(comment)
    deleteDialogRef.current?.showModal()
  }

  const handleUpdateClick = (comment: Comment) => {
    setCurrentComment(comment)
    updateDialogRef.current?.showModal()
  }

  return (
    <>
      <section className="flex flex-col gap-4">
        {comments.length === 0 && (
          <Info>No comments yet. Be the first to comment!</Info>
        )}
        {comments.map((comment) => (
          <PostComment
            key={comment.id}
            comment={comment}
            userId={userId}
            onDeleteClick={handleDeleteClick}
            onUpdateClick={handleUpdateClick}
          />
        ))}
      </section>
      <DeleteCommentDialog
        ref={deleteDialogRef}
        commentId={currentComment?.id || crypto.randomUUID()}
      />
      <UpdateCommentDialog
        ref={updateDialogRef}
        comment={
          currentComment || {
            id: crypto.randomUUID(),
            content: ''
          }
        }
      />
    </>
  )
}
