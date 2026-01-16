// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@pinia/nuxt'],
  ui: {
    global: true,
  },
  colorMode: {
    preference: 'dark'
  },
  compatibilityDate: '2025-01-16',
  app: {
    baseURL: '/myNuxt3/'
  }
})
// Configured for GitHub Pages
