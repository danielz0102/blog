import { useState, useEffect } from 'react'
import { getPosts } from '@/services/blogApi'

export function usePosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let isMounted = true

    getPosts()
      .then((data) => {
        if (!isMounted) return
        setPosts(data)
      })
      .catch(() => {
        if (!isMounted) return
        setError(true)
      })
      .finally(() => {
        if (!isMounted) return
        setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  return {
    posts,
    loading,
    error,
  }
}
