import { usePosts } from '@/lib/hooks/usePosts'

export function App() {
  const { posts, loading, error } = usePosts()

  return (
    <>
      <h1>Hello world</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong</p>}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <code>{JSON.stringify(post)}</code>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
