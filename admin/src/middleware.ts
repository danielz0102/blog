import { defineMiddleware } from 'astro:middleware'

export const onRequest = defineMiddleware((context, next) => {
  const token = context.cookies.get('admin-token')

  if (!token && context.url.pathname !== '/login') {
    return context.redirect('/login')
  }

  return next()
})
