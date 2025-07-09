import { PostsModel } from '#models/PostsModel.js'

async function getAll(req, res) {
  const { limit = 10 } = req.query
  const posts = await PostsModel.getAll(Number(limit))
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

async function create(req, res) {
  const { title, content, isDraft } = req.body
  const post = await PostsModel.create({ title, content, isDraft })

  res.status(201).json(post)
}

async function update(req, res) {
  const { id } = req.params
  const { title, content, isDraft } = req.body
  const updatedPost = await PostsModel.update(id, { title, content, isDraft })

  if (!updatedPost) {
    return res.status(404).json({ error: 'Post not found' })
  }

  res.json(updatedPost)
}

async function deletePost(req, res) {
  const { id } = req.params
  const deleted = await PostsModel.delete(id)

  if (!deleted) {
    return res.status(404).json({ error: 'Post not found' })
  }

  res.status(204).send()
}

export const PostsController = {
  get,
  getAll,
  create,
  update,
  delete: deletePost,
}
