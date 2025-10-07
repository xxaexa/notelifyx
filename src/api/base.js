import axios from 'axios'
import { useAuthStore } from 'src/stores/authStore'
import { Notify } from 'quasar'

const api = axios.create({
  baseURL: 'https://be-noto.vercel.app/api',
})

// inject token

api.interceptors.request.use((config) => {
  const saved = localStorage.getItem('auth')
  if (saved) {
    try {
      const { token } = JSON.parse(saved)
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    } catch (err) {
      console.error('Error parsing auth from localStorage:', err)
    }
  }

  return config
})

// handle error
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const authStore = useAuthStore()

    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      Notify.create({
        type: 'negative',
        message: 'Session expired, please login again',
        position: 'top',
      })

      authStore.logout()
    }

    return Promise.reject(error)
  },
)

export default api
