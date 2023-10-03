import pkg from '../package.json'

export default defineNuxtConfig({
  extends: '@nuxt/ui-pro',
  devtools: { enabled: true, componentInspector: false, viteInspect: false },
  modules: ['@vue-email/nuxt', '@nuxt/content', 'nuxt-og-image', '@nuxt/ui', '@nuxtlabs/github-module', '@nuxtjs/fontaine', '@nuxtjs/google-fonts', '@vueuse/nuxt'],
  vueEmail: {
    playground: false,
  },
  runtimeConfig: {
    public: {
      version: pkg.version,
    },
  },
  ui: {
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
