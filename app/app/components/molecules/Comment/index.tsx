import type { UUID } from 'crypto'
import type { Comment } from '~/types'

export type CommentProps = {
  comment: Comment
  userId?: UUID
  onDeleteClick?: (comment: Comment) => void
  onUpdateClick?: (comment: Comment) => void
}

export default function Comment({ comment, userId, onDeleteClick, onUpdateClick }: CommentProps) {
  const handleDeleteClick = () => {
    onDeleteClick?.(comment)
  }

  const handleUpdateClick = () => {
    onUpdateClick?.(comment)
  }

  return (
    <article>
      <h3>{comment.user.username}</h3>
      <time dateTime={comment.createdAt}>{comment.createdAt}</time>
      <p>{comment.content}</p>
      {comment.user.id === userId && (
        <>
          <button onClick={handleDeleteClick}>Delete</button>
          <button onClick={handleUpdateClick}>Update</button>
        </>
      )}
    </article>
  )
}
