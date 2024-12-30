import { User } from '~/server/models/User'
import { createAuthError } from '~/server/utils/errors'

export default defineEventHandler(async (event) => {
  try {
    const { currentPassword, newPassword } = await readBody(event)
    const userId = event.context.auth.userId

    const user = await User.findById(userId).select('+password')
    if (!user) {
      throw createAuthError('Utilisateur non trouvé')
    }

    const isValid = await user.comparePassword(currentPassword)
    if (!isValid) {
      throw createAuthError('Mot de passe actuel incorrect')
    }

    user.password = newPassword
    user.mustChangePassword = false
    await user.save()

    return {
      message: 'Mot de passe modifié avec succès'
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erreur lors du changement de mot de passe'
    })
  }
})