import { resolve } from 'node:path'

export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: ['@vue-email/nuxt', '@nuxt/ui', '@nuxtjs/fontaine', '@nuxtjs/google-fonts', '@vueuse/nuxt'],
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
