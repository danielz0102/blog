import { PostsModel } from '#models/PostsModel.js'

async function getAll(req, res) {
  const posts = await PostsModel.getAll()
  res.json(posts)
}

async function get(req, res) {
  const { id } = req.params

  const post = await PostsModel.get(id)

  if (!post) {
    return res.status(404).json({ error: 'Post not found' })
  }

  res.json(post)
}

export const PostsController = {
  get,
  getAll,
}
