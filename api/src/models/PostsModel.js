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

async function getAll({
  limit = 30,
  isDraft,
  title,
  createdAt,
  startDate,
  endDate
}) {
  const dateFilters = (() => {
    const filters = {}

    if (createdAt) {
      const start = new Date(createdAt)
      start.setUTCHours(0, 0, 0, 0)

      const end = new Date(createdAt)
      end.setUTCHours(23, 59, 59, 999)

      return {
        gte: start,
        lte: end
      }
    }

    if (startDate) {
      const start = new Date(startDate)
      start.setUTCHours(0, 0, 0, 0)
      filters.gte = start
    }

    if (endDate) {
      const end = new Date(endDate)
      end.setUTCHours(23, 59, 59, 999)
      filters.lte = end
    }

    if (!startDate && !endDate && !createdAt) {
      return undefined
    }

    return filters
  })()

  return await db.post.findMany({
    take: limit,
    orderBy: { createdAt: 'desc' },
    where: {
      isDraft,
      title: title ? { contains: title, mode: 'insensitive' } : undefined,
      createdAt: dateFilters
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
  getAll,
  create,
  update,
  delete: deletePost
}
