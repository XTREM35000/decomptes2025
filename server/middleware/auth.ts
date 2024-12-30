import { verifyToken } from '../utils/auth/tokenService'
import type { H3Event } from 'h3'

// Liste des routes publiques qui ne nécessitent pas d'authentification
const publicRoutes = [
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/refresh',
  '/api/setup/status'  // Ajout de la route de statut setup
]

const isPublicRoute = (path: string): boolean => {
  return publicRoutes.some(route => path.startsWith(route))
}

export default defineEventHandler(async (event: H3Event) => {
  const path = event.path || event.node.req.url || ''
  
  // Skip auth check for public routes
  if (isPublicRoute(path)) {
    return
  }

  const token = getHeader(event, 'authorization')?.replace('Bearer ', '')
  if (!token) {
    throw createError({
      statusCode: 401,
      message: 'Authentication required'
    })
  }

  const decoded = verifyToken(token)
  if (!decoded) {
    throw createError({
      statusCode: 401,
      message: 'Invalid or expired token'
    })
  }

  // Add user info to event context
  event.context.auth = { 
    userId: decoded.userId,
    role: decoded.role 
  }
})