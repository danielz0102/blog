import { db } from '#config/database.js'

async function get(id) {
  return await db.post.findUnique({
    where: { id },
  })
}

async function getAll() {
  return await db.post.findMany()
}

async function create({ title, content, isDraft = false }) {
  return await db.post.create({
    data: {
      title,
      content,
      isDraft,
    },
  })
}

async function update(id, { title, content, isDraft }) {
  const post = await get(id)

  if (!post) return false

  return await db.post.update({
    where: { id },
    data: {
      title,
      content,
      isDraft,
    },
  })
}

async function deletePost(id) {
  const post = await get(id)

  if (!post) return false

  return await db.post.delete({
    where: { id },
  })
}

export const PostsModel = {
  get,
  getAll,
  create,
  update,
  delete: deletePost,
}
