import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = reactive({
    _id: null,
    username: null,
    email: null,
    role: null,
    createdAt: null,
    updatedAt: null,
  })
  const token = ref(null)

  // actions
  const setAuth = (data) => {
    token.value = data.token

    Object.assign(user, {
      _id: data.user._id,
      username: data.user.username,
      email: data.user.email,
      role: data.user.role,
      createdAt: data.user.createdAt,
      updatedAt: data.user.updatedAt,
    })

    // save to local storage
    localStorage.setItem(
      'auth',
      JSON.stringify({
        token: token.value,
        user,
      }),
    )
  }

  const loadAuth = () => {
    const saved = localStorage.getItem('auth')
    if (saved) {
      const parsed = JSON.parse(saved)
      token.value = parsed.token
      Object.assign(user, parsed.user)
    }
  }

  const logout = () => {
    token.value = null
    localStorage.removeItem('auth')
    Object.assign(user, {
      _id: null,
      username: null,
      email: null,
      role: null,
      createdAt: null,
      updatedAt: null,
    })
  }

  return { user, token, setAuth, loadAuth, logout }
})
