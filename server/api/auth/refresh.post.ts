import { generateToken, verifyToken } from '../../utils/auth/tokenService'
import { createAuthError } from '../../utils/errors'

export default defineEventHandler(async (event) => {
  try {
    const { refreshToken } = await readBody(event)
    if (!refreshToken) {
      throw createAuthError('Refresh token required')
    }

    const decoded = verifyToken(refreshToken)
    if (!decoded) {
      throw createAuthError('Invalid refresh token')
    }

    const newToken = generateToken(decoded.userId)
    
    return {
      token: newToken
    }
  } catch (error: any) {
    throw createAuthError(error.message)
  }
})