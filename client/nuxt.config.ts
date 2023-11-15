import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineNuxtConfig } from 'nuxt/config'
import vueEmailModule from '../packages/nuxt/src/module'

export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  alias: {
    'vue-email': fileURLToPath(new URL('../packages/vue-email/src/index.ts', import.meta.url)),
  },
  modules: [vueEmailModule, '@nuxt/ui', '@nuxtjs/fontaine', '@nuxtjs/google-fonts', '@vueuse/nuxt'],
  nitro: {
    output: {
      publicDir: resolve(__dirname, './'),
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
    icons: ['heroicons', 'simple-icons', 'ph', 'twemoji', 'fluent'],
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
  ignore: ['emails/**/*'],
  vueEmail: {
    playground: false,
    baseUrl: 'https://vue-email-demo.vercel.app/',
  },
})
