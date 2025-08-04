import type { Comment } from '~/types'
import PostComment from '~/components/molecules/Comment'

export default function CommentList({ comments }: { comments: Comment[] }) {
  return (
    <section>
      <h2>Comments</h2>
      {comments.length === 0 && (
        <p>No comments yet. Be the first to comment!</p>
      )}
      {comments.map((comment) => (
        <PostComment key={comment.id} comment={comment} />
      ))}
    </section>
  )
}
