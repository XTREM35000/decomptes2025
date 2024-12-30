import { Decompte } from '~/server/models/Decompte'

export default defineEventHandler(async (event) => {
  try {
    const decomptes = await Decompte.find()
      .populate('signatures.userId', 'name email')
      .populate('history.userId', 'name email')
      .sort({ createdAt: -1 })
    
    return decomptes
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Error fetching decomptes'
    })
  }
})