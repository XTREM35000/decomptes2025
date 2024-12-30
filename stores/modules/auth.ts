import { defineStore } from 'pinia'
import type { AuthState, LoginCredentials, User } from '~/types/auth'

export const useAuthStore = defineStore('auth', () => {
<<<<<<< HEAD
=======
  console.log('AuthStore: Initializing')
>>>>>>> 6e73255 (ajout des test)
  const user = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const authStorage = useAuthStorage()
  const api = useApi()

  const isAuthenticated = computed(() => !!user.value)

<<<<<<< HEAD
  const login = async (credentials: LoginCredentials) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await api.fetchWithAuth('/api/auth/login', {
=======
  // Vérification de l'authentification
  const checkAuth = async () => {
    console.log('AuthStore: checkAuth method called')
    const token = authStorage.getToken()
    if (!token) {
      console.log('AuthStore: No token found, user not authenticated')
      return false
    }

    try {
      console.log('AuthStore: Calling API to check authentication')
      const response: any = await api.fetchWithAuth('/api/auth/me')
      user.value = response.user
      console.log('AuthStore: User authenticated', user.value)
      return true
    } catch (err) {
      console.error('AuthStore: Authentication check failed', err)
      logout()
      return false
    }
  }

  // Méthode de connexion
  const login = async (credentials: LoginCredentials) => {
    console.log('AuthStore: login method called with credentials:', credentials)
    loading.value = true
    error.value = null

    try {
      console.log('AuthStore: Attempting API fetch for login')
      const response: any = await api.fetchWithAuth('/api/auth/login', {
>>>>>>> 6e73255 (ajout des test)
        method: 'POST',
        body: credentials
      })
      
<<<<<<< HEAD
      user.value = response.user
      authStorage.setToken(response.token)
      
      return response.user
    } catch (err: any) {
=======
      console.log('AuthStore: Login response', response)
      user.value = response.user
      authStorage.setToken(response.token)
      console.log('AuthStore: User logged in', user.value)
      
      return response.user
    } catch (err: any) {
      console.error('AuthStore: Login error', err)
>>>>>>> 6e73255 (ajout des test)
      error.value = err.message
      throw err
    } finally {
      loading.value = false
<<<<<<< HEAD
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
=======
      console.log('AuthStore: Login process finished')
    }
  }

  // Méthode de déconnexion
  const logout = () => {
    console.log('AuthStore: logout method called')
    user.value = null
    authStorage.removeToken()
    console.log('AuthStore: User logged out, token removed')
>>>>>>> 6e73255 (ajout des test)
  }

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
<<<<<<< HEAD
    register,
    logout,
    checkAuth
  }
})
=======
    logout,
    checkAuth
  }
})
>>>>>>> 6e73255 (ajout des test)
