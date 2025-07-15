import { getPosts } from '@services/posts'
import { useAsync } from 'react-async-hook'

export function Home() {
  const { result: posts, loading, error } = useAsync(getPosts)

  return (
    <main>
      <h1>Welcome to My Blog</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong</p>}
      {posts &&
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
