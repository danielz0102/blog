import express from 'express'
import cors from 'cors'

import { PORT, NODE_ENV } from './config/index.js'

import { usersRouter } from '#routes/usersRouter.js'
import { postsRouter } from '#routes/postsRouter.js'
import { commentsRouter } from '#routes/commentsRouter.js'

import { handle404 } from '#middlewares/handle404.js'
import { handleError } from '#middlewares/handleError.js'

const allowedOrigins = [
  'https://blog-app-vert-sigma.vercel.app',
  'https://danielz0102-admin-blog.netlify.app'
]
const app = express()

app.use(express.json())

if (NODE_ENV === 'development') {
  app.use(cors())
} else {
  app.use(
    cors({
      origin: (origin, cb) => {
        if (allowedOrigins.includes(origin)) {
          cb(null, true)
        } else {
          cb(new Error(`${origin} not allowed by CORS`))
        }
      }
    })
  )
}

app.use('/users', usersRouter)
app.use('/posts', postsRouter)
app.use('/comments', commentsRouter)
app.use(handle404)
app.use(handleError)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
