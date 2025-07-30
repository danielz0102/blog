import { verifyToken } from './verifyToken.js'

export const onlyAdmin = [
  verifyToken,
  (req, res, next) => {
    if (!req.user.admin) {
      return res
        .status(403)
        .json({ error: "You don't have permission to perform this action" })
    }

    next()
  }
]
