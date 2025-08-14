import { db } from '#config/database.js'

async function get(id) {
  return await db.post.findUnique({
    where: { id },
    include: {
      comments: {
        select: {
          id: true,
          content: true,
          createdAt: true,
          user: {
            select: { id: true, username: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      }
    }
  })
}

async function getAllPosts(limit = 30, title) {
  return await db.post.findMany({
    take: limit,
    orderBy: { createdAt: 'desc' },
    where: {
      isDraft: false,
      title: title ? { contains: title, mode: 'insensitive' } : undefined
    },
    include: {
      comments: {
        select: {
          id: true,
          content: true,
          createdAt: true,
          user: {
            select: { id: true, username: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      }
    }
  })
}

async function getAllDrafts(limit = 30, title) {
  return await db.post.findMany({
    take: limit,
    orderBy: { createdAt: 'desc' },
    where: {
      isDraft: true,
      title: title ? { contains: title, mode: 'insensitive' } : undefined
    },
    include: {
      comments: {
        select: {
          id: true,
          content: true,
          createdAt: true,
          user: {
            select: { id: true, username: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      }
    }
  })
}

async function create({ title, content, isDraft = false }) {
  return await db.post.create({
    data: {
      title,
      content,
      isDraft
    }
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
      isDraft
    }
  })
}

async function deletePost(id) {
  const post = await get(id)

  if (!post) return false

  return await db.post.delete({
    where: { id }
  })
}

export const PostsModel = {
  get,
  getAllPosts,
  getAllDrafts,
  create,
  update,
  delete: deletePost
}
