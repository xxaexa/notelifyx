import api from './base'

export const loginApi = async ({ email, password }) => {
  const res = await api.post('auth/login', { email, password })
  return res.data
}

export const registerApi = async ({ email, password, username }) => {
  const res = await api.post('auth/register', { email, password, username })
  return res.data
}
