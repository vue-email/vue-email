import { fileURLToPath } from 'node:url'
import vueEmailModule from '../nuxt/src/module'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true, componentInspector: false, viteInspect: false },
  modules: ['@nuxt/ui', vueEmailModule],
  alias: {
    'vue-email': fileURLToPath(new URL('../vue-email/src/index.ts', import.meta.url)),
    '@vue-email/core': fileURLToPath(new URL('../core/src/index.ts', import.meta.url)),
    '@vue-email/compiler': fileURLToPath(new URL('../compiler/src/index.ts', import.meta.url)),
    '@vue-email/utils': fileURLToPath(new URL('../utils/src/index.ts', import.meta.url)),
  },
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
    playground: true,
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
