import { jwtDecode } from 'jwt-decode'

import { useState, useEffect } from 'react'

export function useUser() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    setUser(get())
  }, [])

  const get = () => {
    const token = localStorage.getItem('token')

    if (!token) return null

    return jwtDecode(token)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return { user, logout }
}
