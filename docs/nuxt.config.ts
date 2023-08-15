import { createResolver } from '@nuxt/kit'
import pkg from '../package.json'
import vueEmailModule from '../src/nuxt/module'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  modules: ['@nuxt/content', vueEmailModule, '@nuxthq/ui', '@nuxtjs/fontaine', '@nuxtjs/google-fonts', '@vueuse/nuxt', 'nuxt-lodash'],
  alias: {
    'vue-email': resolve(__dirname, '../src/index.ts'),
    'vue-email/compiler': resolve(__dirname, '../src/compiler/index.ts'),
  },
  runtimeConfig: {
    public: {
      version: pkg.version,
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
  nitro: {
    prerender: {
      routes: ['/getting-started'],
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
