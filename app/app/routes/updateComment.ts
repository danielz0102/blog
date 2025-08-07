import type { UUID } from 'crypto'
import type { Route } from './+types/updateComment'

import { update } from '~/services/comment'
import { data } from 'react-router'

export async function clientAction({
  request,
  params
}: Route.ClientActionArgs) {
  const formData = await request.formData()
  const content = formData.get('comment')
  const commentId = params.id as UUID

  if (typeof content !== 'string') {
    throw new Response('Client Validation Failed', { status: 400 })
  }

  await update(commentId, content)

  return data({ success: true }, { status: 200 })
}
