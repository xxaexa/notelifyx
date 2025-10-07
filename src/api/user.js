import api from './base'

export const updateUserApi = ({ id, email, password, username }) => {
  return api.put(`users/${id}`, { email, password, username })
}
