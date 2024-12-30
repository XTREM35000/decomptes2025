import { User } from '~/server/models/User'
import { validateAdminRole } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  try {
    // Vérifier que l'utilisateur est admin
    await validateAdminRole(event)

    const userId = event.context.params.id
    const { role } = await readBody(event)

    const user = await User.findById(userId)
    if (!user) {
      throw createError({
        statusCode: 404,
        message: 'Utilisateur non trouvé'
      })
    }

    // Mettre à jour le rôle et activer l'utilisateur
    user.role = role
    user.status = 'ACTIVE'
    await user.save()

    return {
      message: 'Rôle mis à jour avec succès',
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
      message: error.message || 'Erreur lors de la mise à jour du rôle'
    })
  }
})