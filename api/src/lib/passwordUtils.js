import bcrypt from 'bcryptjs'
import { SALT } from '#config/index.js'

export async function hash(password) {
  return await bcrypt.hash(password, SALT)
}

export async function compare(password, hash) {
  return await bcrypt.compare(password, hash)
}
