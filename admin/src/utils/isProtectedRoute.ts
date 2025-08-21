const allowedPages = ['/login']
const allowedActions = ['/user.logout']

export function isProtectedRoute(route: string): boolean {
  return (
    !allowedPages.includes(route) &&
    allowedActions.every((action) => !route.startsWith(`/_actions${action}`))
  )
}
