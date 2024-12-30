import { Workflow } from '~/server/models/Workflow'
import { validateAdminRole } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const id = event.context.params.id
  
  // GET /api/workflows/:id
  if (event.node.req.method === 'GET') {
    const workflow = await Workflow.findById(id)
      .populate('steps')
    
    if (!workflow) {
      throw createError({
        statusCode: 404,
        message: 'Workflow not found'
      })
    }
    
    return workflow
  }
  
  // PUT /api/workflows/:id
  if (event.node.req.method === 'PUT') {
    await validateAdminRole(event)
    const body = await readBody(event)
    
    const workflow = await Workflow.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    ).populate('steps')
    
    if (!workflow) {
      throw createError({
        statusCode: 404,
        message: 'Workflow not found'
      })
    }
    
    return workflow
  }
  
  // DELETE /api/workflows/:id
  if (event.node.req.method === 'DELETE') {
    await validateAdminRole(event)
    
    const workflow = await Workflow.findByIdAndDelete(id)
    if (!workflow) {
      throw createError({
        statusCode: 404,
        message: 'Workflow not found'
      })
    }
    
    return { message: 'Workflow deleted successfully' }
  }
})