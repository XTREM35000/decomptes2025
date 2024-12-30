import jwt from 'jsonwebtoken'

const JWT_SECRET = 'your-super-secret-key-change-in-production'

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '24h' })
}

export const validateServerToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string }
  } catch (error) {
    return null
  }
}