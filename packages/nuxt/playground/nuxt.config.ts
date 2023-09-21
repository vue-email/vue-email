export default defineNuxtConfig({
  modules: ['../src/module'],
  vueEmail: {
    baseUrl: 'https://vue-email-demo.vercel.app/',
    i18n: {
      defaultLocale: 'en',
      translations: {
        en: {
          message: 'Welcome to dashboard',
        },
        es: {
          message: 'Bienvenido al panel',
        },
      },
    },
  },
  devtools: { enabled: true }
})
