import { defineMiddleware } from 'astro:middleware'
import { ADMIN_TOKEN_COOKIE } from './consts'

export const onRequest = defineMiddleware((context, next) => {
  const token = context.cookies.get(ADMIN_TOKEN_COOKIE)

  if (!token && context.url.pathname !== '/login') {
    return context.redirect('/login')
  }

  return next()
})
