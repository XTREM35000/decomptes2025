export const createAuthError = (message: string) => {
  return createError({
    statusCode: 401,
    message,
    fatal: false
  })
}

export const createServerError = (error: any) => {
  console.error('Server error:', error)
  return createError({
    statusCode: error.statusCode || 500,
    message: error.message || 'Internal Server Error',
    fatal: false
  })
}