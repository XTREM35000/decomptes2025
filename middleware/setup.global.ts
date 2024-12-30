 
import { useSetupStore } from '~/stores/modules/setup'

export default defineNuxtRouteMiddleware(async (to) => {
  // Skip on server-side
  if (process.server) return

  const setupStore = useSetupStore()
  const isSetupComplete = await setupStore.checkSetupStatus()
  
  // Si la configuration n'est pas terminée, rediriger vers la page de setup
  // sauf si on y est déjà
  if (!isSetupComplete && !to.path.startsWith('/setup')) {
    return navigateTo('/setup')
  }

  // Si la configuration est terminée, empêcher l'accès aux pages de setup
  if (isSetupComplete && to.path.startsWith('/setup')) {
    return navigateTo('/')
  }
})
 