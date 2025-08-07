import type { Comment } from '~/types'
import PostComment from '~/components/molecules/Comment'
import DeleteCommentDialog from '~/components/molecules/DeleteCommentDialog'
import UpdateCommentDialog from '~/components/organisms/UpdateCommentDialog'
import type { UUID } from 'crypto'
import { useRef, useState } from 'react'

export interface CommentListProps {
  comments: Comment[]
  userId?: UUID
}

export default function CommentList({ comments, userId }: CommentListProps) {
  const deleteDialogRef = useRef<HTMLDialogElement>(null)
  const updateDialogRef = useRef<HTMLDialogElement>(null)
  
  const [currentComment, setCurrentComment] = useState<Comment | null>(null)

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
      <section>
        <h2>Comments</h2>
        {comments.length === 0 && (
          <p>No comments yet. Be the first to comment!</p>
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
      {currentComment && (
        <>
          <DeleteCommentDialog ref={deleteDialogRef} commentId={currentComment.id} />
          <UpdateCommentDialog ref={updateDialogRef} comment={currentComment} />
        </>
      )}
    </>
  )
}
