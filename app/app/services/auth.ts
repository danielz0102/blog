import { API_URL } from '~/config'

export async function auth(
  username: string,
  password: string,
  isRegister = false
): Promise<boolean> {
  const response = await fetch(
    `${API_URL}/users/${isRegister ? 'sign-up' : 'login'}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    }
  )
  const data: { token?: string; error?: string } = await response.json()

  if (!response.ok || !data.token) {
    return false
  }

  localStorage.setItem('token', data.token)
  return true
}
