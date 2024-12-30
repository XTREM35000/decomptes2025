import { defineStore } from 'pinia'
import type { AuthState, LoginCredentials, User } from '~/types/auth'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    loading: false,
    error: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token && !!state.user
  },

  actions: {
    async login({ email, password }: LoginCredentials) {
      this.loading = true
      this.error = null
      
      try {
<<<<<<< HEAD
        const response = await $fetch('/api/auth/login', {
=======
        const response = await $fetch<{ user: User; token: string }>('/api/auth/login', {
>>>>>>> 6e73255 (ajout des test)
          method: 'POST',
          body: { email, password }
        })
        
        this.user = response.user
        this.token = response.token
        localStorage.setItem('auth_token', response.token)
        
        return response.user
      } catch (error: any) {
        this.error = error.message || 'Login failed'
        throw error
      } finally {
        this.loading = false
      }
    },

    async register(userData: { email: string; password: string; name: string }) {
      this.loading = true
      this.error = null
      
      try {
<<<<<<< HEAD
        const response = await $fetch('/api/auth/register', {
=======
        const response = await $fetch<{ user: User; token: string }>('/api/auth/register', {
>>>>>>> 6e73255 (ajout des test)
          method: 'POST',
          body: userData
        })
        
        this.user = response.user
        this.token = response.token
        localStorage.setItem('auth_token', response.token)
        
        return response.user
      } catch (error: any) {
        this.error = error.message || 'Registration failed'
        throw error
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('auth_token')
<<<<<<< HEAD
=======
    },

    async checkAuth() {
      try {
        const token = localStorage.getItem('auth_token')
        if (!token) {
          return false
        }

        const response = await $fetch<{ user: User }>('/api/auth/verify', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (response.user) {
          this.user = response.user
          this.token = token
          return true
        }

        return false
      } catch (error) {
        this.logout()
        return false
      }
>>>>>>> 6e73255 (ajout des test)
    }
  }
})