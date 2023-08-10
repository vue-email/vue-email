import { resolve } from 'node:path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true, componentInspector: false, viteInspect: false },
  alias: {
    'vue-email': resolve(__dirname, '../../src/index.ts'),
    'vue-email/nuxt': resolve(__dirname, '../../nuxt/index.mjs'),
  },
  modules: ['@nuxthq/ui', 'vue-email/nuxt'],
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
  },
})
