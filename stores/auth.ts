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
        const response = await $fetch('/api/auth/login', {
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
        const response = await $fetch('/api/auth/register', {
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
    }
  }
})