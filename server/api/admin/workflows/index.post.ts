import { Workflow } from '~/server/models/Workflow'
import { validateAdminRole } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  try {
    await validateAdminRole(event)
    
    const body = await readBody(event)
    const workflow = await Workflow.create(body)
    
    return workflow
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error creating workflow'
    })
  }
})