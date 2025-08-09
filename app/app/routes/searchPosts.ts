import type { Route } from './+types/searchPosts'

import { getRecentPosts } from '~/services/posts'

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url)
  const title = url.searchParams.get('title')

  if (!title) return null

  return await getRecentPosts(title)
}
