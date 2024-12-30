import { ref } from 'vue'

export const useAuthToken = () => {
  const token = ref<string | null>(null)

  const setToken = (newToken: string) => {
    token.value = newToken
    localStorage.setItem('auth_token', newToken)
  }

  const getToken = () => {
    if (!token.value) {
      token.value = localStorage.getItem('auth_token')
    }
    return token.value
  }

  const removeToken = () => {
    token.value = null
    localStorage.removeItem('auth_token')
  }

  return {
    token,
    setToken,
    getToken,
    removeToken
  }
}