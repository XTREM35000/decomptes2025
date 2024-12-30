import { User } from '~/server/models/User'
import { generateToken, generateTempPassword } from '~/server/utils/auth/tokenService'
import { createAuthError } from '~/server/utils/errors'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  try {
    const existingUser = await User.findOne({ email: body.email })
    if (existingUser) {
      throw createAuthError('Email already exists')
    }

    const tempPassword = generateTempPassword()

    // Créer l'utilisateur avec statut PENDING
    const user = await User.create({
      email: body.email,
      password: tempPassword, // Mot de passe temporaire
      name: body.name,
      role: 'PENDING',
      status: 'PENDING',
      mustChangePassword: true
    })

    // TODO: Envoyer email avec mot de passe temporaire
    
    const token = generateToken({ 
      userId: user._id.toString(),
      role: user.role
    })
    
    return {
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        status: user.status,
        mustChangePassword: user.mustChangePassword,
        createdAt: user.createdAt
      },
      token,
      tempPassword // En développement uniquement, à retirer en production
    }
  } catch (error: any) {
    throw createAuthError(error.message)
  }
})