import api from './api'

export const login = async (credentials) => {
  const { token } = await api('/users/login', {
    method: 'POST',
    body: credentials,
  })
  localStorage.setItem('token', token)
}

export const signUp = async (data) => {
  const { token } = await api('/users/sign-up', {
    method: 'POST',
    body: data,
  })
  localStorage.setItem('token', token)
}
