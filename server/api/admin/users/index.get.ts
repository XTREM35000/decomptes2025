import { User } from '~/server/models/User'
import { validateAdminRole } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  try {
    await validateAdminRole(event)

    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 })

    return users
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erreur lors de la récupération des utilisateurs'
    })
  }
})