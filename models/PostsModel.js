import { db } from '#config/database.js'

async function get(id) {
  return await db.post.findUnique({
    where: { id },
  })
}

async function getAll(limit = 30) {
  return await db.post.findMany({
    take: limit,
    orderBy: { createdAt: 'desc' },
    where: { isDraft: false },
    include: {
      comments: {
        include: {
          user: {
            select: { id: true, username: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  })
}

async function getDrafts(limit = 30) {
  return await db.post.findMany({
    take: limit,
    orderBy: { createdAt: 'desc' },
    where: { isDraft: true },
    include: {
      comments: {
        include: {
          user: {
            select: { id: true, username: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  })
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
  getDrafts,
  create,
  update,
  delete: deletePost,
}
