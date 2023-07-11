// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    'vue-email/nuxt',
  ],
  typescript: {
    shim: false,
  },
})
