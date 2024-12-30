export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AuthenticationError'
  }
}

export const handleAuthError = (error: any) => {
  console.error('Authentication error:', error)
  
  return createError({
    statusCode: 401,
    message: error.message || 'Authentication failed'
  })
}