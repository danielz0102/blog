import { UsersModel } from '#models/UsersModel.js'
import { signJWT } from '#lib/signJWT.js'

async function signUp(req, res) {
  const { username, password } = req.body

  const user = await UsersModel.create({ username, password })

  if (!user) {
    return res.status(400).json({ error: 'User already exists' })
  }

  const token = signJWT({
    id: user.id,
    username: user.username,
    admin: user.admin
  })

  res.status(201).json({ token })
}

async function login(req, res) {
  const { username, password } = req.body
  const user = await UsersModel.login({ username, password })

  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' })
  }

  const token = signJWT({
    id: user.id,
    username: user.username,
    admin: user.admin
  })

  res.json({ token })
}

export const UsersController = {
  signUp,
  login
}
