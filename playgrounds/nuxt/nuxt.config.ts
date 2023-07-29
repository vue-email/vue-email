import { resolve } from 'node:path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  alias: {
    'vue-email': resolve(__dirname, '../../src/index.ts'),
    'vue-email/nuxt': resolve(__dirname, '../../src/nuxt.mjs'),
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
  components: {
    dirs: [
      '~/components/',
      {
        path: '~/emails',
        extensions: ['vue'],
        global: true,
        prefix: 'Emails',
        preload: true,
        prefetch: true,
        watch: true,
      },
    ],
  },
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },
  nitro: {
    serverAssets: [
      {
        baseName: 'emails',
        dir: '../emails',
      },
    ],
  },
  vueEmail: {
    baseUrl: 'http://localhost:3000',
  },
})
