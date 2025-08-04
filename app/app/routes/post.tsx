import type { UUID } from 'crypto'
import type { Route } from './+types/post'

import { getPost } from '~/services/posts'

export async function loader({ params }: Route.LoaderArgs) {
  if (!params.id) {
    throw new Response('Post not found', { status: 404 })
  }

  const post = await getPost(params.id as UUID)

  if (!post) {
    throw new Response('Post not found', { status: 404 })
  }

  return post
}

export default function Post({ loaderData: post }: Route.ComponentProps) {
  return (
    <main>
      <article>
        <h1>{post.title}</h1>
        <time dateTime={post.createdAt}>{post.createdAt}</time>
        <p>{post.content}</p>
      </article>

      <section className="my-5">
        <h2>Comments</h2>
        {post.comments.length === 0 && (
          <p>No comments yet. Be the first to comment!</p>
        )}
        {post.comments.map((comment) => (
          <article key={comment.id}>
            <h3>{comment.user.username}</h3>
            <time dateTime={comment.createdAt}>{comment.createdAt}</time>
            <p>{comment.content}</p>
          </article>
        ))}
      </section>
    </main>
  )
}
