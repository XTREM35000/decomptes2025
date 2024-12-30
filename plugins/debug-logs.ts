export default defineNuxtPlugin((nuxtApp) => {
    console.warn('NUXT PLUGIN: Démarrage de l\'application', nuxtApp)
    
    nuxtApp.hook('app:mounted', () => {
      console.warn('NUXT PLUGIN: Application montée')
    })
  })