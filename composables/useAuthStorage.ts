export const useAuthStorage = () => {
  const getToken = () => {
    if (process.server) return null
    return window.localStorage.getItem('auth_token')
  }

  const setToken = (token: string) => {
    if (process.server) return
    window.localStorage.setItem('auth_token', token)
  }

  const removeToken = () => {
    if (process.server) return
    window.localStorage.removeItem('auth_token')
  }

  return {
    getToken,
    setToken,
    removeToken
  }
}