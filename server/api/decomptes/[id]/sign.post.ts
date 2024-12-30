// server/api/decomptes/[id]/sign.post.ts
import { Decompte } from '~/server/models/Decompte'

export default defineEventHandler(async (event) => {
  const id = event.context.params.id
  const userId = event.context.auth.userId
  
  try {
    const decompte = await Decompte.findById(id)
    if (!decompte) {
      throw createError({
        statusCode: 404,
        message: 'Décompte non trouvé'
      })
    }

    // Vérifier si l'utilisateur peut signer
    const user = await User.findById(userId)
    if (!user || decompte.currentStep !== user.role) {
      throw createError({
        statusCode: 403,
        message: 'Non autorisé à signer ce décompte'
      })
    }

    // Ajouter la signature
    decompte.signatures.push({
      userId,
      signedAt: new Date(),
      role: user.role
    })

    // Mettre à jour l'étape suivante
    const workflow = ['CHEF_MISSION', 'DTZ', 'DMC', 'DGA', 'DG']
    const currentIndex = workflow.indexOf(user.role)
    
    if (currentIndex < workflow.length - 1) {
      decompte.currentStep = workflow[currentIndex + 1]
      decompte.status = 'PENDING_SIGNATURE'
    } else {
      decompte.status = 'APPROVED'
    }

    // Ajouter à l'historique
    decompte.history.push({
      action: 'SIGNATURE',
      userId,
      details: `Signature par ${user.role}`
    })

    await decompte.save()
    return decompte
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erreur lors de la signature'
    })
  }
})
