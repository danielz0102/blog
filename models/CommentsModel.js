import { db } from '#config/database.js'
import { Result } from '#lib/Result.js'

async function create({ content, userId, postId }) {
  const user = await db.user.findUnique({
    where: { id: userId },
  })

  if (!user) {
    return Result.failure('User not found')
  }

  const post = await db.post.findUnique({
    where: { id: postId },
  })

  if (!post) {
    return Result.failure('Post not found')
  }

  const comment = await db.comment.create({
    data: {
      content,
      post: { connect: { id: postId } },
      user: { connect: { id: userId } },
    },
  })

  return Result.success(comment)
}

async function update({ id, content }) {
  const comment = await db.comment.findUnique({
    where: { id },
  })

  if (!comment) return false

  return await db.comment.update({
    where: { id },
    data: { content },
  })
}

async function deleteComment(id) {
  const comment = await db.comment.findUnique({
    where: { id },
  })

  if (!comment) return false

  return await db.comment.delete({
    where: { id },
  })
}

export const CommentsModel = {
  create,
  update,
  delete: deleteComment,
}
