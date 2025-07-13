import { getPosts } from '@services/posts'
import { useAsync } from 'react-async-hook'

export function Home() {
  const { result: posts, loading, error } = useAsync(getPosts)

  return (
    <main>
      <h1>Welcome to My Blog</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong</p>}
      <ul>
        {posts &&
          posts.map((post) => (
            <li key={post.id}>
              <code>{JSON.stringify(post)}</code>
            </li>
          ))}
      </ul>
    </main>
  )
}
