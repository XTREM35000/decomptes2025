
import { useAuthStore } from '~/stores/modules/auth'
import { useSetupStore } from '~/stores/modules/setup'

export default defineNuxtRouteMiddleware(async (to) => {
  // Skip middleware on server-side
  if (process.server) return

  const setupStore = useSetupStore()
  const authStore = useAuthStore()
  
  // Vérifier d'abord si la configuration initiale est terminée
  const isSetupComplete = await setupStore.checkSetupStatus()
  
  // Si la configuration n'est pas terminée, autoriser uniquement les routes de setup
  if (!isSetupComplete) {
    if (!to.path.startsWith('/setup')) {
      return navigateTo('/setup')
    }
    return
  }

  // Configuration terminée, gérer l'authentification
  const publicRoutes = ['/login', '/register']
  
  if (publicRoutes.includes(to.path)) {
    if (authStore.isAuthenticated) {
      return navigateTo('/')
    }
    return
  }

  if (!authStore.isAuthenticated) {
    try {
      const isAuthed = await authStore.checkAuth()
      if (!isAuthed) {
        return navigateTo('/login')
      }
    } catch {
      return navigateTo('/login')
    }
  }
})
