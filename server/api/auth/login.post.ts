import { User } from '~/server/models/User'
<<<<<<< HEAD
import { generateToken } from '~/server/utils/token'
import { handleAuthError } from '~/server/utils/errors/auth'
import { handleDatabaseError } from '~/server/utils/errors/database'
=======
import type { IUser } from '~/server/models/User'
import { generateToken } from '~/server/utils/auth/tokenService'
import mongoose from 'mongoose'
>>>>>>> 6e73255 (ajout des test)

export default defineEventHandler(async (event) => {
  try {
    const { email, password } = await readBody(event)
<<<<<<< HEAD
    
    const user = await User.findOne({ email })
      .select('+password')
      .catch(err => { throw handleDatabaseError(err) })
      
    if (!user || !(await user.comparePassword(password))) {
=======
    console.log('Login attempt for:', email)
    
    const user = await User.findOne({ email }).select('+password').exec() as IUser | null
    if (!user) {
      console.log('User not found:', email)
>>>>>>> 6e73255 (ajout des test)
      throw createError({
        statusCode: 401,
        message: 'Invalid credentials'
      })
    }

<<<<<<< HEAD
    const token = generateToken(user._id.toString())
    
    return {
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt
=======
    const isValidPassword = await user.comparePassword(password)
    console.log('Password validation:', isValidPassword)
    
    if (!isValidPassword) {
      console.log('Invalid password for user:', email)
      throw createError({
        statusCode: 401,
        message: 'Invalid credentials'
      })
    }

    const token = generateToken({ 
      userId: user._id.toString(),
      role: user.role
    })
    console.log('Token generated for user:', email)
    
    return {
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
        status: user.status,
        mustChangePassword: user.mustChangePassword,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin
>>>>>>> 6e73255 (ajout des test)
      },
      token
    }
  } catch (error: any) {
<<<<<<< HEAD
    throw handleAuthError(error)
=======
    console.error('Login error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Login failed'
    })
>>>>>>> 6e73255 (ajout des test)
  }
})