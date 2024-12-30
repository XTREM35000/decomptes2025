import { WorkflowTemplate } from '~/server/models/WorkflowTemplate'
import { validateAdminRole } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  try {
    const user = await validateAdminRole(event)
    const body = await readBody(event)

    // Créer le template de workflow
    const template = await WorkflowTemplate.create({
      ...body,
      organizationId: user.organizationId
    })

    return template
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error creating workflow template'
    })
  }
})