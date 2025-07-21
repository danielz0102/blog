import { useLoaderData } from 'react-router'

export function Home() {
  const posts = useLoaderData()

  return (
    <main>
      <h1>Welcome to My Blog</h1>
      {!posts && <p>Loading...</p>}
      {posts?.error && <p>Something went wrong</p>}
      {Array.isArray(posts) &&
        posts.map((post) => (
          <article key={post.id}>
            <h2>
              <a href={`/posts/${post.id}`}>{post.title}</a>
            </h2>
            <p>
              <small>{post.date}</small>
            </p>
          </article>
        ))}
    </main>
  )
}
