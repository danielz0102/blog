import api from './api'

export const login = async (credentials) => {
  if (!credentials) {
    throw new Error('Credentials are required')
  }

  const { token } = await api('/users/login', {
    method: 'POST',
    body: credentials,
  })

  return token
}

export const signUp = async (data) => {
  if (!data) {
    throw new Error('Credentials are required')
  }

  const { token } = await api('/users/sign-up', {
    method: 'POST',
    body: data,
  })

  return token
}
