import { resolve } from 'node:path'
import vueEmailModule from '../src/nuxt/module'

export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  alias: {
    'vue-email': resolve(__dirname, '../src/index.ts'),
    'vue-email/compiler': resolve(__dirname, '../src/compiler/index.ts'),
  },
  modules: [vueEmailModule, '@nuxthq/ui', '@nuxtjs/fontaine', '@nuxtjs/google-fonts'],
  nitro: {
    output: {
      publicDir: resolve(__dirname, '../dist/client'),
    },
  },
  app: {
    baseURL: process.env.NODE_ENV === 'development' ? undefined : '/__vue_email__/client',
  },
  vite: {
    build: {
      target: 'esnext',
    },
  },
  ui: {
    global: true,
    icons: ['heroicons', 'simple-icons', 'ph', 'twemoji'],
  },
  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700],
    },
  },
  tailwindcss: {
    exposeConfig: true,
    viewer: false,
  },
  vueEmail: {
    playground: false,
    baseUrl: 'https://vue-email-demo.vercel.app/',
  },
})
