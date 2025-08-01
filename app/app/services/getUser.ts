import type { UserPayload } from '~/types'
import { jwtDecode } from 'jwt-decode'

export function getUser() {
  const token = localStorage.getItem('token')

  return token ? jwtDecode<UserPayload>(token) : null
}
