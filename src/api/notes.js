import api from './base'

export const getNoteApi = async ({ id }) => {
  const res = await api.get(`notes/${id}`)
  return res.data
}

export const getNotesApi = async () => {
  const res = await api.get('notes')
  return res.data
}

export const createNoteApi = async ({ title, description }) => {
  const res = await api.post('notes', { title, description })
  return res.data
}

export const updateNoteApi = async ({ _id, title, description }) => {
  const res = await api.put(`notes/${_id}`, { title, description })
  return res.data
}

export const deleteNoteApi = async ({ _id }) => {
  const res = await api.delete(`notes/${_id}`)
  return res.data
}
