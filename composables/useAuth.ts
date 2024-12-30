<<<<<<< HEAD
export const useAuth = () => {
=======
 
import { defineStore } from 'pinia'
import { useAuthStore } from '~/stores/modules/auth'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'


export const useAuth = () => {
  console.log('useAuth: Initializing')
>>>>>>> 6e73255 (ajout des test)
  const auth = useAuthStore()
  const router = useRouter()
  const toast = useToast()

<<<<<<< HEAD
  const login = async (credentials: { email: string; password: string }) => {
    try {
      await auth.login(credentials)
      router.push('/')
      toast.success('Connexion réussie')
    } catch (error: any) {
=======
  // Méthode de connexion
  const login = async (credentials: { email: string; password: string }) => {
    console.log('useAuth: login method called with credentials:', credentials)
    try {
      console.log('useAuth: Calling auth.login')
      await auth.login(credentials)
      console.log('useAuth: Login in store successful')
      router.push('/')
      toast.success('Connexion réussie')
    } catch (error: any) {
      console.error('useAuth: Login error', error)
>>>>>>> 6e73255 (ajout des test)
      toast.error(error.message || 'Erreur de connexion')
      throw error
    }
  }

<<<<<<< HEAD
  const logout = () => {
    auth.logout()
=======
  // Méthode de déconnexion
  const logout = () => {
    console.log('useAuth: logout method called')
    auth.logout()
    console.log('useAuth: User logged out')
>>>>>>> 6e73255 (ajout des test)
    router.push('/login')
    toast.success('Déconnexion réussie')
  }

<<<<<<< HEAD
  const checkAuth = async () => {
    try {
      return await auth.checkAuth()
    } catch (error) {
=======
  // Vérification de l'authentification
  const checkAuth = async () => {
    console.log('useAuth: checkAuth method called')
    try {
      const isAuthenticated = await auth.checkAuth()
      console.log('useAuth: Authentication check successful, isAuthenticated:', isAuthenticated)
      return isAuthenticated
    } catch (error) {
      console.error('useAuth: Authentication check error', error)
>>>>>>> 6e73255 (ajout des test)
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
<<<<<<< HEAD
}
=======
}
>>>>>>> 6e73255 (ajout des test)
