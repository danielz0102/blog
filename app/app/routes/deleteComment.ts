import type { UUID } from 'crypto'
import type { Route } from './+types/deleteComment'

import { deleteComment } from '~/services/comment'

export async function clientAction({ params }: Route.ActionArgs) {
  await deleteComment(params.id as UUID)
}
