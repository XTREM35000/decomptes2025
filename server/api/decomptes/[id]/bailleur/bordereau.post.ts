import { Decompte } from '~/server/models/Decompte'
import { canGenerateBaileurBordereau } from '~/server/utils/signatures'

export default defineEventHandler(async (event) => {
  const id = event.context.params.id
  
  try {
    const decompte = await Decompte.findById(id)
      .populate('physicalSignatures.userId', 'name role')
    
    if (!decompte) {
      throw createError({
        statusCode: 404,
        message: 'Décompte non trouvé'
      })
    }

    if (!canGenerateBaileurBordereau(decompte)) {
      throw createError({
        statusCode: 403,
        message: 'Toutes les signatures physiques et électroniques sont requises'
      })
    }

    // Générer le bordereau pour le bailleur
    const bordereau = await generateBaileurBordereau(decompte)
    
    // Mettre à jour le statut
    decompte.workflow.sentToBailleurAt = new Date().toISOString()
    await decompte.save()

    setHeader(event, 'Content-Type', 'application/pdf')
    setHeader(event, 'Content-Disposition', `attachment; filename="bordereau-bailleur-${decompte.reference}.pdf"`)
    
    return bordereau
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erreur lors de la génération du bordereau'
    })
  }
})