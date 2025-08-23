import type { Route } from './+types/home'
import { getRecentPosts } from '~/services/posts'

import { Link } from 'react-router'
import Date from '~/components/atoms/Date'

export function meta(): Route.MetaDescriptors {
  return [
    { title: 'My Blog' },
    {
      name: 'description',
      content: 'This is a blog app made with React Router v7'
    }
  ]
}

export async function clientLoader() {
  return getRecentPosts()
}

export default function Home({ loaderData: posts }: Route.ComponentProps) {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:mx-auto md:w-2xl">
      <h1 className="border-b-w-full border-b border-b-zinc-400 pb-1 text-3xl font-bold">
        Recent Posts
      </h1>
      <section className="flex flex-col gap-4">
        {posts.map(({ id, title, createdAt }) => (
          <article key={id}>
            <h2 className="mb-1 text-2xl">
              <Link
                to={`/posts/${id}`}
                className="block transform outline-0 transition-transform focus-visible:scale-105"
              >
                {title}
              </Link>
            </h2>
            <Date date={createdAt} />
          </article>
        ))}
      </section>
    </main>
  )
}
