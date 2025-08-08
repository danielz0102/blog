import type { UUID } from 'crypto'
import type { Route } from './+types/post'

import { data } from 'react-router'

import { getPost } from '~/services/posts'
import { getUser } from '~/services/getUser'
import { comment } from '~/services/comment'

import { BlogPost } from '~/components/organisms/BlogPost'
import CommentList from '~/components/organisms/CommentList'
import CommentForm from '~/components/organisms/CommentForm'
import Info from '~/components/molecules/Info'

export function meta({ data }: Route.MetaArgs): Route.MetaDescriptors {
  return [{ title: `${data?.post.title}` }]
}

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
    <main className="mx-auto flex max-w-2xl flex-col gap-4 p-4">
      <BlogPost post={post} className="mb-8" />
      {user ? (
        <CommentForm postId={post.id} />
      ) : (
        <Info>You are not logged in. Please login to be able to comment.</Info>
      )}
      <CommentList comments={post.comments} userId={user?.id} />
    </main>
  )
}
