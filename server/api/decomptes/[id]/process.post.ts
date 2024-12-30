import { Decompte } from '~/server/models/Decompte'
import { User } from '~/server/models/User'

export default defineEventHandler(async (event) => {
  const id = event.context.params.id
  const userId = event.context.auth.userId
  const { action } = await readBody(event)
  
  try {
    const decompte = await Decompte.findById(id)
    if (!decompte) {
      throw createError({
        statusCode: 404,
        message: 'Décompte non trouvé'
      })
    }

    const user = await User.findById(userId)
    if (!user) {
      throw createError({
        statusCode: 404,
        message: 'Utilisateur non trouvé'
      })
    }

    // Vérifier les permissions selon le rôle
    const canProcess = decompte.currentStep === user.role

    if (!canProcess) {
      throw createError({
        statusCode: 403,
        message: 'Non autorisé à traiter ce décompte'
      })
    }

    // Mettre à jour le statut selon l'action et le rôle
    switch (user.role) {
      case 'COURRIER':
        if (action === 'receive') {
          decompte.status = 'PENDING_DMC'
          decompte.currentStep = 'DMC'
        } else if (action === 'send') {
          decompte.status = 'COMPLETED'
        }
        break

      case 'DMC':
        if (action === 'start') {
          decompte.status = 'DMC_PROCESSING'
        } else if (action === 'complete') {
          decompte.status = 'PENDING_DGA'
          decompte.currentStep = 'DGA'
        }
        break

      case 'DGA':
        if (action === 'validate') {
          decompte.status = 'PENDING_COURRIER'
          decompte.currentStep = 'COURRIER'
        } else if (action === 'reject') {
          decompte.status = 'REJECTED'
        }
        break
    }

    // Ajouter à l'historique
    decompte.history.push({
      action,
      userId,
      details: `${action} par ${user.role}`
    })

    await decompte.save()
    return decompte
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erreur lors du traitement'
    })
  }
})