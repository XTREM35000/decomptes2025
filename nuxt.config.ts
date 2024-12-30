<<<<<<< HEAD
// https://nuxt.com/docs/api/configuration/nuxt-config
=======
>>>>>>> 6e73255 (ajout des test)
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@vee-validate/nuxt'
  ],

<<<<<<< HEAD
  nitro: {
    plugins: ['~/server/plugins/mongoose.ts']
  },

  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

=======
  css: ['~/assets/css/main.css'],

>>>>>>> 6e73255 (ajout des test)
  colorMode: {
    classSuffix: ''
  },

  app: {
    head: {
      title: 'AutoDécompte Pro Secure',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
<<<<<<< HEAD
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
          crossorigin: 'anonymous'
        }
      ]
    }
  },

  devtools: { enabled: false },
  compatibilityDate: '2024-12-29'
=======
      ]
    }
  },
  build: {
    transpile: ['vue-toastification']
  },
  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET
  },
   debug: true,
  devtools: { enabled: true },
  compatibilityDate: '2024-12-30'
>>>>>>> 6e73255 (ajout des test)
})