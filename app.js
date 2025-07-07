import express from 'express'
import { PORT } from './config/index.js'

import { usersRouter } from '#routes/usersRouter.js'
import { postsRouter } from '#routes/postsRouter.js'
import { commentsRouter } from '#routes/commentsRouter.js'

import { handle404 } from '#middlewares/handle404.js'
import { handleError } from '#middlewares/handleError.js'

const app = express()

app.use(express.json())

app.use('/users', usersRouter)
app.use('/posts', postsRouter)
app.use('/comments', commentsRouter)
app.use(handle404)
app.use(handleError)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
