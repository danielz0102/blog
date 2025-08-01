import type { UUID } from 'crypto'
import type { JwtPayload } from 'jwt-decode'

type GetPostsResponse = { error: string } | Post[] | Post

export type Post = {
  id: UUID
  title: string
  content: string
  createdAt: string
  comments: Comment[]
}

export type Comment = {
  id: UUID
  content: string
  createdAt: string
  user: User
}

export type User = {
  id: UUID
  username: string
}

export interface UserPayload extends JwtPayload, User {
  admin: boolean
}
