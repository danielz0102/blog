import type { UUID } from 'crypto'
import type { JwtPayload } from 'jwt-decode'

type GetPostsResponse = { error: string } | Post[] | Post

type Post = {
  id: UUID
  title: string
  content: string
  createdAt: string
  comments: Comment[]
}

type Comment = {
  id: UUID
  content: string
  createdAt: string
  user: User
}

type User = {
  id: UUID
  username: string
}

interface UserPayload extends JwtPayload, User {
  admin: boolean
}

declare global {
  interface ImportMetaEnv {
    readonly VITE_API_URL: string
  }
}
