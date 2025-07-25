import { useLoaderData, Link } from 'react-router'
import { userLoader } from '@/lib/loaders/userLoader'

import { CommentForm } from '@organisms/CommentForm'

export function Post() {
  const post = useLoaderData()
  const user = userLoader()

  return (
    <main>
      <article>
        <h1>{post.title}</h1>
        <p>
          <small>{post.date}</small>
        </p>
        <p>{post.content}</p>
      </article>
      <section>
        <h2>Comments</h2>
        {user ? (
          <CommentForm postId={post.id} />
        ) : (
          <Link to="/login">Log in to comment.</Link>
        )}
        <ul>
          {post.comments.length === 0 && <li>No comments yet.</li>}
          {post.comments.map((comment) => (
            <li key={comment.id}>
              <h3>{comment.username}</h3>
              <p>
                <small>{comment.date}</small>
              </p>
              <p>{comment.content}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
