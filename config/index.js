import 'dotenv/config'

export const {
  PORT = 3000,
  NODE_ENV = 'development',
  SALT = 10,
  JWT_SECRET,
} = process.env
