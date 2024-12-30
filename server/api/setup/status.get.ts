import { Organization } from '~/server/models/Organization'

export default defineEventHandler(async () => {
  try {
    const org = await Organization.findOne()
    return {
      isComplete: !!org?.setupCompleted,
      organization: org ? {
        id: org._id,
        name: org.name,
        setupCompleted: org.setupCompleted,
        settings: org.settings
      } : null
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || 'Error checking setup status'
    })
  }
})