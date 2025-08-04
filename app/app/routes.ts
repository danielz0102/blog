import {
  type RouteConfig,
  index,
  layout,
  route
} from '@react-router/dev/routes'

export default [
  layout('./layouts/MainLayout.tsx', [
    index('routes/home.tsx'),
    route('auth/:action', 'routes/auth.ts'),
    route('logout', 'routes/logout.ts'),
    route('posts/:id', 'routes/post.tsx')
  ])
] satisfies RouteConfig
