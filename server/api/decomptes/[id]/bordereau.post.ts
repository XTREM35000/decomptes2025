// server/api/decomptes/[id]/bordereau.post.ts
import { Decompte } from '~/server/models/Decompte'
import { generateBordereau } from '~/server/utils/pdf'

export default defineEventHandler(async (event) => {
  const id = event.context.params.id
  
  try {
    const decompte = await Decompte.findById(id)
      .populate('signatures.userId', 'name role')
    
    if (!decompte) {
      throw createError({
        statusCode: 404,
        message: 'Décompte non trouvé'
      })
    }

    // Vérifier si le bordereau peut être généré
    if (!decompte.signatures.some(s => s.role === 'CHEF_MISSION')) {
      throw createError({
        statusCode: 403,
        message: 'Le décompte doit être signé par le chef de mission'
      })
    }

    const pdf = await generateBordereau(decompte)
    
    setHeader(event, 'Content-Type', 'application/pdf')
    setHeader(event, 'Content-Disposition', `attachment; filename="bordereau-${decompte.reference}.pdf"`)
    
    return pdf
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Erreur lors de la génération du bordereau'
    })
  }
})
