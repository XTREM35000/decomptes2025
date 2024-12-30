export const useAuthApi = () => {
  const config = useRuntimeConfig()
  
  const login = async (email: string, password: string) => {
    try {
      return await $fetch('/api/auth/login', {
        method: 'POST',
        body: { email, password }
      })
    } catch (error: any) {
      throw createError({
        statusCode: error.statusCode || 500,
        message: error.message || 'Login failed'
      })
    }
  }

  const checkAuth = async (token: string) => {
    try {
      return await $fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
    } catch (error: any) {
      throw createError({
        statusCode: error.statusCode || 500,
        message: error.message || 'Auth check failed'
      })
    }
  }

  return {
    login,
    checkAuth
  }
}