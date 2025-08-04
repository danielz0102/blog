import type { UUID } from 'crypto'
import type { Route } from './+types/post'

import { getPost } from '~/services/posts'

import { BlogPost } from '~/components/molecules/BlogPost'
import CommentList from '~/components/organisms/CommentList'

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
    <main className="flex flex-col gap-4">
      <BlogPost post={post} />
      <CommentList comments={post.comments} />
    </main>
  )
}
