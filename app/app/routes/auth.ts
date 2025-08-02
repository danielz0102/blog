import { data } from 'react-router'
import type { Route } from './+types/auth'

import { auth } from '~/services/auth'

export async function clientAction({ request, params }: Route.ActionArgs) {
  const formData = await request.formData()
  const username = formData.get('username')
  const password = formData.get('password')
  const isRegister = params.action === 'register'

  if (typeof username !== 'string' || typeof password !== 'string') {
    return data({ error: 'Invalid form data' }, { status: 400 })
  }

  const success = await auth(username, password, isRegister)

  if (!success) {
    return data({ error: 'Authentication failed' }, { status: 401 })
  }
}
