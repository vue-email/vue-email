import { resolve } from 'node:path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true, componentInspector: false, viteInspect: false },
  alias: {
    'vue-email': resolve(__dirname, '../../src/index.ts'),
    'vue-email/compiler': resolve(__dirname, '../../src/compiler/index.ts'),
  },
  modules: ['@nuxt/ui', '@vue-email/nuxt'],
  typescript: {
    shim: false,
    includeWorkspace: true,
  },
  ui: {
    global: true,
    icons: ['heroicons', 'ph'],
  },
  tailwindcss: {
    exposeConfig: true,
    viewer: false,
  },
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },
  vueEmail: {
    baseUrl: 'https://vue-email-demo.vercel.app/',
    verbose: true,
    playground: false,
    i18n: {
      defaultLocale: 'en',
      translations: {
        en: {
          message: 'Welcome to dashboard {user}',
        },
        es: {
          message: 'Bienvenido al panel {user}',
        },
      },
    },
  },
})
