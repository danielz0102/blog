import { defineMiddleware } from 'astro:middleware'
import { sequence } from 'astro:middleware'

import { ADMIN_TOKEN_COOKIE } from './consts'
import { adminTokenIsValid } from './utils/adminTokenIsValid'

const verifyAdminToken = defineMiddleware((ctx, next) => {
  const token = ctx.cookies.get(ADMIN_TOKEN_COOKIE)

  if (token && !adminTokenIsValid(token.value)) {
    ctx.cookies.delete(ADMIN_TOKEN_COOKIE)
  }

  return next()
})

const protectRoute = defineMiddleware((ctx, next) => {
  const isAdmin = ctx.cookies.has(ADMIN_TOKEN_COOKIE)

  if (!isAdmin && ctx.url.pathname !== '/login') {
    return ctx.redirect('/login')
  }

  return next()
})

export const onRequest = sequence(verifyAdminToken, protectRoute)
