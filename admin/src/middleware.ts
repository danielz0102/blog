import { defineMiddleware } from 'astro:middleware'

export const onRequest = defineMiddleware((context, next) => {
  if (!context.locals.token && context.url.pathname !== '/login') {
    return context.redirect('/login')
  }

  return next()
})
