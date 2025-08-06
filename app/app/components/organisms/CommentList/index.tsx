import type { Comment } from '~/types'
import PostComment from '~/components/molecules/Comment'
import type { UUID } from 'crypto'

export interface CommentListProps {
  postId: UUID
  comments: Comment[]
  userId?: UUID
}

export default function CommentList({
  comments,
  userId,
  postId
}: CommentListProps) {
  return (
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
          postId={postId}
        />
      ))}
    </section>
  )
}
