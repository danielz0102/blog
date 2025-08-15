import type { JwtPayload } from 'jwt-decode'

interface User {
  id: string
  username: string
  admin: boolean
}

interface UserPayload extends JwtPayload, User {}

export interface GetAllPostsResponse {
  id: string
  title: string
  content: string
  createdAt: Date
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
