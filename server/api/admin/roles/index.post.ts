import { Role } from '~/server/models/Role'
import { validateAdminRole } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  try {
    await validateAdminRole(event)
    
    const body = await readBody(event)
    const role = await Role.create(body)
    
    return role
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error creating role'
    })
  }
})