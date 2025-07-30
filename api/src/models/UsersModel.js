import { db } from '#config/database.js'
import { compare, hash } from '#lib/passwordUtils.js'

async function create({ username, password }) {
  const usersExists = await db.user.findFirst({
    where: { username }
  })

  if (usersExists) return false

  const hashedPassword = await hash(password)

  const user = await db.user.create({
    data: {
      username,
      password: hashedPassword
    }
  })

  return {
    id: user.id,
    username: user.username,
    admin: false
  }
}

async function login({ username, password }) {
  const user = await db.user.findFirst({
    where: { username }
  })

  if (!user) return false

  const isValidPassword = await compare(password, user.password)

  return isValidPassword ? user : false
}

export const UsersModel = {
  create,
  login
}
