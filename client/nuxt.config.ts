import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineNuxtConfig } from 'nuxt/config'
import vueEmailModule from '../packages/nuxt/src/module'

export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  alias: {
    '@vue-email/core': fileURLToPath(new URL('../packages/core/src/index.ts', import.meta.url)),
    '@vue-email/compiler': fileURLToPath(new URL('../packages/compiler/src/index.ts', import.meta.url)),
    '@vue-email/utils': fileURLToPath(new URL('../packages/utils/src/index.ts', import.meta.url)),
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
