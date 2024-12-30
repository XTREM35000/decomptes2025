import { User } from '~/server/models/User'
import { validateAdminRole } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  try {
    await validateAdminRole(event)

    const userId = event.context.params.id
    const user = await User.findById(userId)
    
    if (!user) {
      throw createError({
        statusCode: 404,
        message: 'Utilisateur non trouvé'
      })
    }

    user.status = 'ACTIVE'
    await user.save()

    return {
      message: 'Utilisateur activé avec succès',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        status: user.status
      }
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erreur lors de l\'activation de l\'utilisateur'
    })
  }
})