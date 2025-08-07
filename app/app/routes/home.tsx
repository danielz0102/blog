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
    <main className="mx-auto flex max-w-2xl flex-1 flex-col gap-4 px-4 py-4">
      <h1 className="border-b-w-full border-b-1 border-b-zinc-400 pb-1 text-3xl font-bold">
        Recent Posts
      </h1>
      <section className="flex flex-col gap-4">
        {posts.map(({ id, title, createdAt }) => (
          <article key={id}>
            <h2 className="mb-1 text-2xl">
              <Link to={`/posts/${id}`}>{title}</Link>
            </h2>
            <time dateTime={createdAt} className="text-zinc-400">
              {createdAt}
            </time>
          </article>
        ))}
      </section>
    </main>
  )
}
