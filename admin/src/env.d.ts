import type { JwtPayload } from 'jwt-decode'

interface User {
  id: string
  username: string
  admin: boolean
}

interface UserPayload extends JwtPayload, User {}
