<<<<<<< HEAD

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
=======
export default defineNuxtRouteMiddleware((to) => {
  // Liste des routes publiques qui ne nécessitent pas d'authentification
  const publicRoutes = ['/', '/login', '/register']
  
  // Skip middleware on server-side
  if (process.server) return
  
  // Allow access to public routes
  if (publicRoutes.includes(to.path)) {
    return
  }

  // Check for auth token
  const token = localStorage.getItem('auth_token')
  if (!token) {
    return navigateTo('/login')
  }
})
>>>>>>> 6e73255 (ajout des test)
