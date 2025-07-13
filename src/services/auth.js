import api from './api'

export const login = (credentials) =>
  api('/users/login', {
    method: 'POST',
    body: credentials,
  })

export const signUp = (data) =>
  api('/users/sign-up', {
    method: 'POST',
    body: data,
  })
