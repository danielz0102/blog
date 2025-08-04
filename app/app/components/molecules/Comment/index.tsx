import type { Comment } from '~/types'

export function Comment({ comment }: { comment: Comment }) {
  return (
    <article key={comment.id}>
      <h3>{comment.user.username}</h3>
      <time dateTime={comment.createdAt}>{comment.createdAt}</time>
      <p>{comment.content}</p>
    </article>
  )
}
