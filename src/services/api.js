import { API_URL } from '@/config'
import { ApiError } from '@/lib/customErrors/ApiError'

async function api(endpoint, { method = 'GET', body = null } = {}) {
  const token = localStorage.getItem('token')
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  const response = await fetch(`${API_URL}${endpoint}`, config)

  if (!response.ok) {
    const errorData = await response.json()
    throw new ApiError('API error', response.status, errorData)
  }

  return response.json()
}

export default api
