import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from 'astro:env/server'

export function adminTokenIsValid(token: string): boolean {
  try {
    const decoded = jwt.verify(token, TOKEN_SECRET)

    if (typeof decoded === 'object' && 'admin' in decoded) {
      return decoded.admin
    }

    return false
  } catch {
    return false
  }
}
