import { User } from '~/server/models/User'
import { validateServerToken } from '~/server/utils/token'
import { createAuthError } from '~/server/utils/errors'

export default defineEventHandler(async (event) => {
  try {
    const token = getHeader(event, 'authorization')?.replace('Bearer ', '')
    if (!token) {
      throw createAuthError('No token provided')
    }

    const decoded = validateServerToken(token)
    if (!decoded) {
      throw createAuthError('Invalid token')
    }

    const user = await User.findById(decoded.userId)
    if (!user) {
      throw createAuthError('User not found')
    }

    return {
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt
      }
    }
  } catch (error: any) {
    throw createAuthError(error.message)
  }
})