import { redirect, data } from 'react-router'
import { API_URL } from '@/config'

export async function authAction({ request }) {
  const formData = await request.formData()
  const { username, password } = Object.fromEntries(formData)
  const endpoint = request.url.includes('sign-up') ? 'sign-up' : 'login'

  const response = await fetch(`${API_URL}/users/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })

  const body = await response.json()

  if (!response.ok) {
    return data({ error: body.error }, { status: response.status })
  }

  localStorage.setItem('token', body.token)

  return redirect('/')
}
