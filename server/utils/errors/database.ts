export class DatabaseError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'DatabaseError'
  }
}

export const handleDatabaseError = (error: any) => {
  console.error('Database error:', error)
  
  if (error.code === 11000) {
    return createError({
      statusCode: 409,
      message: 'Duplicate entry found'
    })
  }
  
  return createError({
    statusCode: 500,
    message: 'Database operation failed'
  })
}