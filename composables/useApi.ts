export const useApi = () => {
<<<<<<< HEAD
=======
  const config = useRuntimeConfig()
>>>>>>> 6e73255 (ajout des test)
  const authStorage = useAuthStorage()
  
  const fetchWithAuth = async (url: string, options: any = {}) => {
    const token = authStorage.getToken()
    
    const headers = {
      ...options.headers,
<<<<<<< HEAD
=======
      'Content-Type': 'application/json',
>>>>>>> 6e73255 (ajout des test)
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }

    try {
<<<<<<< HEAD
      return await $fetch(url, {
        ...options,
        headers
      })
=======
      const response = await $fetch(url, {
        ...options,
        headers
      })
      return response
>>>>>>> 6e73255 (ajout des test)
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