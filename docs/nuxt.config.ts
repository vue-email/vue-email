import { createResolver } from '@nuxt/kit'
import pkg from '../package.json'
import vueEmailModule from '../src/nuxt/module'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  devtools: {
    enabled: false,
  },
  extends: '@flowko/docs-template',
  modules: ['@nuxt/content', '@nuxthq/ui', vueEmailModule, '@nuxtjs/fontaine', '@nuxtjs/google-fonts', '@vueuse/nuxt', 'nuxt-lodash'],
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
      routes: ['/getting-started', '/api/search.json'],
    },
  },
  routeRules: {
    '/': { redirect: '/getting-started', prerender: false },
  },
  typescript: {
    strict: false,
    includeWorkspace: true,
  },
})
