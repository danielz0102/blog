import type { UserPayload } from '../env'
import { jwtDecode } from 'jwt-decode'

export function adminTokenIsValid(token: string): boolean {
  try {
    const decoded = jwtDecode<UserPayload>(token)
    return decoded.admin
  } catch {
    return false
  }
}
