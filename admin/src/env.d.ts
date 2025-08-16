import type { JwtPayload } from 'jwt-decode'

interface User {
  id: string
  username: string
  admin: boolean
}

interface UserPayload extends JwtPayload, User {}

export interface Post {
  id: string
  title: string
  content: string
  createdAt: string
  isDraft: boolean
  comments: Comment[]
}

export interface Comment {
  id: string
  content: string
  createdAt: string
  user: User
}

export interface User {
  id: string
  username: string
}
