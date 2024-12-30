import { defineStore } from 'pinia'
import type { AuthState, LoginCredentials, User } from '~/types/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const authStorage = useAuthStorage()
  const api = useApi()

  const isAuthenticated = computed(() => !!user.value)

  const login = async (credentials: LoginCredentials) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await api.fetchWithAuth('/api/auth/login', {
        method: 'POST',
        body: credentials
      })
      
      user.value = response.user
      authStorage.setToken(response.token)
      
      return response.user
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const register = async (userData: { 
    email: string
    name: string 
  }) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await api.fetchWithAuth('/api/auth/register', {
        method: 'POST',
        body: userData
      })
      
      // Ne pas authentifier automatiquement - attendre validation admin
      return response
    } catch (err: any) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    user.value = null
    authStorage.removeToken()
  }

  const checkAuth = async () => {
    const token = authStorage.getToken()
    if (!token) return false

    try {
      const response = await api.fetchWithAuth('/api/auth/me')
      user.value = response.user
      return true
    } catch {
      logout()
      return false
    }
  }

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    checkAuth
  }
})