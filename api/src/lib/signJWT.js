import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '#config/index.js'

export function signJWT(payload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '7d'
  })
}
