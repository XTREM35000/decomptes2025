import { verifyToken } from '~/server/utils/auth/tokenService' 
import { User } from '~/server/models/User'
 
export default defineEventHandler(async (event) => {
  try {
    // Get the token from the Authorization header
    const authHeader = getHeader(event, 'Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      throw createError({
        statusCode: 401,
        message: 'No token provided'
      })
    }

    const token = authHeader.split(' ')[1]
    
    // Verify the token
    const decoded = await verifyToken(token)
    if (!decoded || !decoded.userId) {
      throw createError({
        statusCode: 401,
        message: 'Invalid token'
      })
    }

    // Get the user
    const user = await User.findById(decoded.userId)
    if (!user) {
      throw createError({
        statusCode: 401,
        message: 'User not found'
      })
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        status: user.status,
        mustChangePassword: user.mustChangePassword,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin
      }
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Authentication failed'
    })
  }
})
