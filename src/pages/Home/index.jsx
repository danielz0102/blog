import { Suspense } from 'react'
import { Link, Await, useLoaderData } from 'react-router'

export function Home() {
  const { posts } = useLoaderData()

  return (
    <main>
      <h1>Welcome to My Blog</h1>
      <Suspense fallback={<p>Loading posts...</p>}>
        <Await resolve={posts} errorElement={<p>Something went wrong</p>}>
          {(resolvedPosts) =>
            resolvedPosts.map((post) => (
              <article key={post.id}>
                <h2>
                  <Link to={`/posts/${post.id}`}>{post.title}</Link>
                </h2>
                <p>
                  <small>{post.date}</small>
                </p>
              </article>
            ))
          }
        </Await>
      </Suspense>
    </main>
  )
}
