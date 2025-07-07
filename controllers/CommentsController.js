import { CommentsModel } from '#models/CommentsModel.js'

async function create(req, res) {
  const { content, postId } = req.body
  const userId = req.user.id
  const result = await CommentsModel.create({ content, userId, postId })

  if (!result.success) {
    return res.status(404).json({ error: result.error })
  }

  res.status(201).json(result.data)
}

async function update(req, res) {
  const { id } = req.params
  const { content } = req.body
  const comment = await CommentsModel.update({ id, content })

  if (!comment) {
    return res.status(404).json({ error: 'Comment not found' })
  }

  res.status(200).json(comment)
}

async function remove(req, res) {
  const { id } = req.params
  const deleted = await CommentsModel.delete(id)

  if (!deleted) {
    return res.status(404).json({ error: 'Comment not found' })
  }

  res.status(204).end()
}

export const CommentsController = {
  create,
  update,
  remove,
}
