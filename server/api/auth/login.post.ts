import { User } from '~/server/models/User'
import { generateToken } from '~/server/utils/token'
import { handleAuthError } from '~/server/utils/errors/auth'
import { handleDatabaseError } from '~/server/utils/errors/database'

export default defineEventHandler(async (event) => {
  try {
    const { email, password } = await readBody(event)
    
    const user = await User.findOne({ email })
      .select('+password')
      .catch(err => { throw handleDatabaseError(err) })
      
    if (!user || !(await user.comparePassword(password))) {
      throw createError({
        statusCode: 401,
        message: 'Invalid credentials'
      })
    }

    const token = generateToken(user._id.toString())
    
    return {
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt
      },
      token
    }
  } catch (error: any) {
    throw handleAuthError(error)
  }
})