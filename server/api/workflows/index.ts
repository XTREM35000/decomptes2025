import { Workflow } from '~/server/models/Workflow'
import { validateAdminRole } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  // GET /api/workflows
  if (event.node.req.method === 'GET') {
    const workflows = await Workflow.find()
      .populate('steps')
      .sort({ createdAt: -1 })
    
    return workflows
  }
  
  // POST /api/workflows
  if (event.node.req.method === 'POST') {
    await validateAdminRole(event)
    const body = await readBody(event)
    
    const workflow = await Workflow.create({
      ...body,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    
    return workflow
  }
})