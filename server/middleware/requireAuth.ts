import { verifyToken } from '../utils/auth/tokenService'
import { createAuthError } from '../utils/errors'

export default defineEventHandler(async (event) => {
  // Skip auth check for public routes
  if (isPublicRoute(event.path)) return

  const token = getHeader(event, 'authorization')?.replace('Bearer ', '')
  if (!token) {
    throw createAuthError('Authentication required')
  }

  const decoded = verifyToken(token)
  if (!decoded) {
    throw createAuthError('Invalid or expired token')
  }

  event.context.auth = { userId: decoded.userId }
})

function isPublicRoute(path: string): boolean {
  const publicRoutes = [
    '/api/auth/login',
    '/api/auth/register',
<<<<<<< HEAD
    '/api/auth/refresh'
  ]
  return publicRoutes.includes(path)
=======
    '/api/auth/refresh',
    '/',
    '/login',
    '/register',
    '/_nuxt',
    '/favicon.ico'
  ]
  return publicRoutes.some(route => path.startsWith(route))
>>>>>>> 6e73255 (ajout des test)
}