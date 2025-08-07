import type { Post } from '~/types'

export function BlogPost({ post }: { post: Post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <time dateTime={post.createdAt}>{post.createdAt}</time>
      <p>{post.content}</p>
    </article>
  )
}
