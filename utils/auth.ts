// Authentication utility functions
export const parseAuthToken = (token: string) => {
  try {
    return atob(token).split(':')
  } catch {
    return null
  }
}

export const validateToken = (token: string | null): boolean => {
  if (!token) return false
  const parsed = parseAuthToken(token)
  return !!parsed && parsed.length === 2
}