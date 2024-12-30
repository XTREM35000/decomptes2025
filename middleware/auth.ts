export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore()
  const publicRoutes = ['/login']
  
  if (!auth.isAuthenticated && !publicRoutes.includes(to.path)) {
    const isAuthed = await auth.checkAuth()
    if (!isAuthed) {
      return navigateTo('/login')
    }
  }
  
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
    return navigateTo('/')
  }
})