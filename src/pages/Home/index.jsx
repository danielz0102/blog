import { usePosts } from '@hooks/usePosts'

export function Home() {
  const { posts, loading, error } = usePosts()

  return (
    <main>
      <h1>Welcome to My Blog</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong</p>}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <code>{JSON.stringify(post)}</code>
          </li>
        ))}
      </ul>
    </main>
  )
}
