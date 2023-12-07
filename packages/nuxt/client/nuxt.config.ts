import { fileURLToPath } from 'node:url'
import { defineNuxtConfig } from 'nuxt/config'
import vueEmailModule from '../src/module'

export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true, componentInspector: false, viteInspect: false },
  modules: [vueEmailModule, '@nuxt/ui', '@nuxtjs/fontaine', '@nuxtjs/google-fonts', '@vueuse/nuxt'],
  alias: {
    'vue-email': fileURLToPath(new URL('../../vue-email/src/index.ts', import.meta.url)),
    '@vue-email/core': fileURLToPath(new URL('../../core/src/index.ts', import.meta.url)),
    '@vue-email/compiler': fileURLToPath(new URL('../../compiler/src/index.ts', import.meta.url)),
    '@vue-email/utils': fileURLToPath(new URL('../../utils/src/index.ts', import.meta.url)),
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
