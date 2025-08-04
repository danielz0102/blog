import type { UUID } from 'crypto'
import type { Route } from './+types/post'

import { getPost } from '~/services/posts'

import { BlogPost } from '~/components/molecules/BlogPost'
import { Comment } from '~/components/molecules/Comment'

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
      <BlogPost post={post} />

      <section className="my-5">
        <h2>Comments</h2>
        {post.comments.length === 0 && (
          <p>No comments yet. Be the first to comment!</p>
        )}
        {post.comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </section>
    </main>
  )
}
