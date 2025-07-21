import { jwtDecode } from 'jwt-decode'

export function userLoader() {
  const token = localStorage.getItem('token')

  if (!token) {
    return null
  }

  return jwtDecode(token)
}
