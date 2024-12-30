export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore()
<<<<<<< HEAD
  const publicRoutes = ['/login']
  
  if (!auth.isAuthenticated && !publicRoutes.includes(to.path)) {
    const isAuthed = await auth.checkAuth()
    if (!isAuthed) {
=======
  const publicRoutes = ['/login', '/register']
  
  // Si l'utilisateur n'est pas authentifié et la route n'est pas publique
  if (!auth.isAuthenticated && !publicRoutes.includes(to.path)) {
    try {
      // Tenter de restaurer la session
      const isAuthed = await auth.checkAuth()
      if (!isAuthed) {
        return navigateTo('/login')
      }
    } catch {
>>>>>>> 6e73255 (ajout des test)
      return navigateTo('/login')
    }
  }
  
<<<<<<< HEAD
  if (auth.isAuthenticated && to.path === '/login') {
    return navigateTo('/')
  }

  // Role-based route protection
  const roleRoutes = {
    '/decomptes/nouveau': ['CHEF_MISSION'],
    '/signatures': ['DTZ', 'DMC', 'DGA', 'DG', 'BAILLEUR']
  } as const

  const requiredRoles = roleRoutes[to.path as keyof typeof roleRoutes]
  if (requiredRoles && !requiredRoles.includes(auth.user?.role as any)) {
=======
  // Rediriger les utilisateurs authentifiés depuis les routes publiques
  if (auth.isAuthenticated && publicRoutes.includes(to.path)) {
>>>>>>> 6e73255 (ajout des test)
    return navigateTo('/')
  }
})