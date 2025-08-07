import type { Route } from './+types/home'
import { getRecentPosts } from '~/services/posts'

import { Link } from 'react-router'

export function meta(): Route.MetaDescriptors {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' }
  ]
}

export async function clientLoader() {
  return getRecentPosts()
}

export default function Home({ loaderData: posts }: Route.ComponentProps) {
  return (
    <main className="flex-1">
      <h1>Welcome to My Blog</h1>
      <section>
        {posts.map(({ id, title, createdAt }) => (
          <article key={id}>
            <h2>
              <Link to={`/posts/${id}`}>{title}</Link>
            </h2>
            <time dateTime={createdAt}>{createdAt}</time>
          </article>
        ))}
      </section>
    </main>
  )
}
