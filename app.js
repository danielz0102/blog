import express from 'express'
import { PORT } from './config/index.js'

import { postsRouter } from '#routes/postsRouter.js'

const app = express()

app.use(express.json())

app.use('/posts', postsRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
