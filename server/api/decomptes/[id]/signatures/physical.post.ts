import { Decompte } from '~/server/models/Decompte'

export default defineEventHandler(async (event) => {
  const id = event.context.params.id
  const userId = event.context.auth.userId
  const { signatureId } = await readBody(event)
  
  try {
    const decompte = await Decompte.findById(id)
    if (!decompte) {
      throw createError({
        statusCode: 404,
        message: 'Décompte non trouvé'
      })
    }

    const signature = decompte.physicalSignatures.id(signatureId)
    if (!signature) {
      throw createError({
        statusCode: 404,
        message: 'Signature non trouvée'
      })
    }

    // Vérifier que la signature électronique existe
    if (!signature.signedAt) {
      throw createError({
        statusCode: 400,
        message: 'La signature électronique est requise avant la signature physique'
      })
    }

    // Mettre à jour le statut de la signature
    signature.physicallySignedAt = new Date().toISOString()
    signature.status = 'COMPLETED'

    // Vérifier si toutes les signatures sont complètes
    const allSignaturesComplete = checkAllSignaturesComplete(decompte)
    if (allSignaturesComplete) {
      decompte.status = 'PENDING_BAILLEUR'
    }

    await decompte.save()
    return decompte
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erreur lors de la signature physique'
    })
  }
})