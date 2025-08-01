import type { User } from '~/types'
import type { JwtPayload } from 'jwt-decode'
import { jwtDecode } from 'jwt-decode'

interface UserPayload extends JwtPayload, User {
  admin: boolean
}

export function getUser() {
  const token = localStorage.getItem('token')

  return token ? jwtDecode<UserPayload>(token) : null
}
