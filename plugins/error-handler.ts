export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    console.error('Vue error:', error)
    
    // Handle specific error types
    if (error.statusCode === 401) {
      const auth = useAuthStore()
      auth.clearAuth()
      navigateTo('/login')
      return
    }
    
    // Log but don't crash the app
    console.error(`Error: ${error.message}`)
    console.error(`Component: ${instance?.$options?.name}`)
    console.error(`Info: ${info}`)
  }
})