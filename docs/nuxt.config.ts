import { createResolver } from '@nuxt/kit'
import pkg from '../package.json'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxt/devtools', 'vue-email/nuxt', '@nuxthq/ui', '@nuxtjs/fontaine', '@nuxtjs/google-fonts', '@vueuse/nuxt', 'nuxt-lodash'],
  alias: {
    'vue-email': resolve(__dirname, '../src/index.ts'),
    'vue-email/nuxt': resolve(__dirname, '../nuxt/index.mjs'),
  },
  runtimeConfig: {
    public: {
      version: pkg.version,
    },
  },
  ui: {
    global: true,
    icons: ['heroicons', 'simple-icons', 'ph'],
  },
  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700],
    },
  },
  nitro: {
    prerender: {
      routes: ['/getting-started'],
      failOnError: false,
    },
  },
  routeRules: {
    '/': { redirect: '/getting-started', prerender: false },
  },
  experimental: {
    payloadExtraction: false,
  },
  typescript: {
    strict: false,
    includeWorkspace: true,
  },
  css: ['~/assets/css/scrollbars.css'],
  content: {
    highlight: {
      theme: {
        light: 'material-theme-lighter',
        default: 'material-theme',
        dark: 'material-theme-palenight',
      },
      preload: ['json', 'js', 'ts', 'html', 'css', 'vue', 'diff', 'shell', 'markdown', 'yaml', 'bash', 'ini'],
    },
    navigation: {
      fields: ['icon'],
    },
  },
})
