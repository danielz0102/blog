import type { UUID } from 'crypto'
import type { Route } from './+types/post'

import { data } from 'react-router'

import { getPost } from '~/services/posts'
import { getUser } from '~/services/getUser'
import { comment } from '~/services/comment'

import { BlogPost } from '~/components/molecules/BlogPost'
import CommentList from '~/components/organisms/CommentList'
import CommentForm from '~/components/organisms/CommentForm'

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const post = await getPost(params.id as UUID)
  const user = getUser()

  return { post, user }
}

export async function clientAction({ request, params }: Route.ActionArgs) {
  const formData = await request.formData()
  const commentText = formData.get('comment')
  const postId = params.id as UUID

  if (typeof commentText !== 'string') {
    throw new Response('Client Validation Failed', { status: 400 })
  }

  await comment(postId, commentText)

  return data({ success: true }, { status: 201 })
}

export default function Post({
  loaderData: { post, user }
}: Route.ComponentProps) {
  return (
    <main className="flex flex-col gap-4">
      <BlogPost post={post} />
      {user ? <CommentForm postId={post.id} /> : <p>Login to comment</p>}
      <CommentList comments={post.comments} userId={user?.id} />
    </main>
  )
}
