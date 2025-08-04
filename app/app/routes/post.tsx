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
        <p>
          <time dateTime={post.createdAt}>{post.createdAt}</time>
        </p>
        <p>{post.content}</p>
      </article>
    </main>
  )
}
