import { createResolver } from '@nuxt/kit'
import pkg from '../package.json'
import vueEmailModule from '../src/nuxt/module'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  extends: '@nuxt/ui-pro',
  devtools: { enabled: true, componentInspector: false, viteInspect: false },
  modules: ['@nuxt/content', 'nuxt-og-image', '@nuxt/ui', '@nuxtlabs/github-module', vueEmailModule, '@nuxtjs/fontaine', '@nuxtjs/google-fonts', '@vueuse/nuxt'],
  alias: {
    'vue-email': resolve(__dirname, '../src/index.ts'),
    'vue-email/compiler': resolve(__dirname, '../src/compiler/index.ts'),
  },
  vueEmail: {
    playground: false,
  },
  runtimeConfig: {
    public: {
      version: pkg.version,
    },
  },
  ui: {
    global: true,
    icons: ['heroicons', 'simple-icons', 'ph', 'twemoji', 'solar'],
  },
  fontMetrics: {
    fonts: ['DM Sans'],
  },
  googleFonts: {
    display: 'swap',
    download: true,
    families: {
      'DM+Sans': [400, 500, 600, 700],
    },
  },
  nitro: {
    prerender: {
      routes: ['/', '/getting-started', '/api/search.json'],
    },
  },
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },
  typescript: {
    strict: false,
    includeWorkspace: true,
  },
  github: {
    owner: 'Dave136',
    repo: 'vue-email',
    branch: 'main',
  },
})
