import type { Post } from '~/types'

import Date from '~/components/atoms/Date'

export function BlogPost({
  post,
  className
}: {
  post: Post
  className?: string
}) {
  return (
    <article className={className}>
      <h1 className="mb-1 text-3xl font-bold">{post.title}</h1>
      <Date date={post.createdAt} />
      <p className="mt-4">{post.content}</p>
    </article>
  )
}
