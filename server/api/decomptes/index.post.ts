// server/api/decomptes/index.post.ts
import { Decompte } from '~/server/models/Decompte'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const userId = event.context.auth.userId
    
    // Créer le décompte
    const decompte = await Decompte.create({
      ...body,
      status: 'DRAFT',
      currentStep: 'CHEF_MISSION',
      history: [{
        action: 'CREATION',
        userId,
        details: 'Création du décompte'
      }]
    })

    // Ajouter la signature du chef de mission
    decompte.signatures.push({
      userId,
      signedAt: new Date(),
      role: 'CHEF_MISSION'
    })

    // Mettre à jour le statut
    decompte.status = 'PENDING_SIGNATURE'
    decompte.history.push({
      action: 'SIGNATURE',
      userId,
      details: 'Signature par le chef de mission'
    })

    await decompte.save()

    return decompte
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || 'Erreur lors de la création du décompte'
    })
  }
})
