import { API_URL } from '@/config'

async function api(endpoint, { method = 'GET', body = null } = {}) {
  const token = localStorage.getItem('token')
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  const response = await fetch(`${API_URL}${endpoint}`, config)

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData || { message: 'An unexpected error occurred' })
  }

  return response.json()
}

export default api
