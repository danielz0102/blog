import { jwtDecode } from 'jwt-decode'

import { useState, useEffect } from 'react'

import { login as loginService, signUp as signUpService } from '@services/auth'

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

  const login = async ({ username, password }) => {
    const token = await loginService({ username, password })
    localStorage.setItem('token', token)
    setUser(get())
  }

  const signUp = async ({ username, password }) => {
    const token = await signUpService({ username, password })
    localStorage.setItem('token', token)
    setUser(get())
  }

  return { user, login, signUp, logout }
}
