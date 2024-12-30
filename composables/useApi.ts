export const useApi = () => {
  const authStorage = useAuthStorage()
  
  const fetchWithAuth = async (url: string, options: any = {}) => {
    const token = authStorage.getToken()
    
    const headers = {
      ...options.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }

    try {
      return await $fetch(url, {
        ...options,
        headers
      })
    } catch (error: any) {
      if (error.statusCode === 401) {
        authStorage.removeToken()
        navigateTo('/login')
      }
      throw error
    }
  }

  return {
    fetchWithAuth
  }
}