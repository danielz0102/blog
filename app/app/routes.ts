import {
  type RouteConfig,
  index,
  layout,
  route
} from '@react-router/dev/routes'

export default [
  layout('./layouts/MainLayout.tsx', [
    index('routes/home.tsx'),
    route('auth', 'routes/auth.ts'),
    route('logout', 'routes/logout.ts')
  ])
] satisfies RouteConfig
