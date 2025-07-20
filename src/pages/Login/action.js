import { redirect } from 'react-router'
import { API_URL } from '@/config'

export async function loginAction({ request }) {
  const formData = await request.formData()
  const { username, password } = Object.fromEntries(formData)

  const response = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })

  const data = await response.json()

  if (!response.ok) {
    return { error: data.error }
  }

  localStorage.setItem('token', data.token)

  return redirect('/')
}
