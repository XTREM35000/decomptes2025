import { User } from '../models/User'

export const validateAdminRole = async (event: any) => {
  const userId = event.context.auth?.userId
  if (!userId) {
    throw createError({
      statusCode: 401,
      message: 'Non authentifié'
    })
  }

  const user = await User.findById(userId)
  if (!user || !['DG', 'DGA'].includes(user.role)) {
    throw createError({
      statusCode: 403,
      message: 'Accès non autorisé'
    })
  }

  return user
}