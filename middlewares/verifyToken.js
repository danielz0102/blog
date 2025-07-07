import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '#config/index.js'

export function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization']

  if (!bearerHeader) {
    return res.status(401).json({ error: 'Authorization header missing' })
  }

  const token = bearerHeader.split(' ')[1]

  jwt.verify(token, JWT_SECRET, (err, data) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' })
    }

    req.user = data
    next()
  })
}
