import { WorkflowStep } from '~/server/models/WorkflowStep'
import { validateAdminRole } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  try {
    await validateAdminRole(event)
    
    const body = await readBody(event)
    const step = await WorkflowStep.create(body)
    
    return step
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error creating workflow step'
    })
  }
})