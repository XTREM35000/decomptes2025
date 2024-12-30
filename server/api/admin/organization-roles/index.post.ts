import { OrganizationRole } from '~/server/models/OrganizationRole'
import { validateAdminRole } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  try {
    const user = await validateAdminRole(event)
    const body = await readBody(event)

    // Créer le rôle organisationnel
    const role = await OrganizationRole.create({
      ...body,
      organizationId: user.organizationId
    })

    return role
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error creating organization role'
    })
  }
})