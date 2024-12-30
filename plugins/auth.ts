export default defineNuxtPlugin(async (nuxtApp) => {
  // Add auth header to all requests
  nuxtApp.hook('app:created', () => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      $fetch.create({
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    }
  })
})