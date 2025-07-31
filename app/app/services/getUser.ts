import { jwtDecode } from 'jwt-decode'

export function getUser() {
  const token = localStorage.getItem('token')

  return token ? jwtDecode(token) : null
}
