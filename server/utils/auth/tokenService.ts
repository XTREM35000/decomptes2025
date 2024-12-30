import jwt from 'jsonwebtoken'
<<<<<<< HEAD
import { config } from '../../config/constants'

export interface TokenPayload {
  userId: string
  role?: string
  exp?: number
}

export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, config.jwt.secret, { 
    expiresIn: config.jwt.expiresIn
  })
}

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, config.jwt.secret) as TokenPayload
=======
import { config } from '../../config'

export const generateToken = (payload: { userId: string; role?: string }) => {
  return jwt.sign(payload, config.jwt.secret, { 
    expiresIn: config.jwt.expiresIn 
  })
}

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, config.jwt.secret) as { 
      userId: string; 
      role?: string 
    }
>>>>>>> 6e73255 (ajout des test)
  } catch {
    return null
  }
}

export const generateTempPassword = (): string => {
<<<<<<< HEAD
  const length = 12
=======
  const length = config.auth.tempPasswordLength
>>>>>>> 6e73255 (ajout des test)
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
  let password = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length)
    password += charset[randomIndex]
  }
  return password
}