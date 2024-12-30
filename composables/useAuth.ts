export const useAuth = () => {
  const auth = useAuthStore()
  const router = useRouter()
  const toast = useToast()

  const login = async (credentials: { email: string; password: string }) => {
    try {
      await auth.login(credentials)
      router.push('/')
      toast.success('Connexion réussie')
    } catch (error: any) {
      toast.error(error.message || 'Erreur de connexion')
      throw error
    }
  }

  const logout = () => {
    auth.logout()
    router.push('/login')
    toast.success('Déconnexion réussie')
  }

  const checkAuth = async () => {
    try {
      return await auth.checkAuth()
    } catch (error) {
      router.push('/login')
      return false
    }
  }

  return {
    user: computed(() => auth.user),
    isAuthenticated: computed(() => auth.isAuthenticated),
    login,
    logout,
    checkAuth
  }
}