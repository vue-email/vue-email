// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxthq/ui', 'vue-email/nuxt'],
  typescript: {
    shim: false,
  },
  ui: {
    global: true,
    icons: ['heroicons', 'ph'],
  },
  tailwindcss: {
    exposeConfig: true,
    viewer: false,
  },
  components: {
    dirs: [
      '~/components/',
      {
        path: '~/emails',
        extensions: ['vue'],
        global: true,
        prefix: 'Emails',
        preload: true,
        prefetch: true,
        watch: true,
      },
    ],
  },
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },
  nitro: {
    serverAssets: [
      {
        baseName: 'emails',
        dir: '../emails',
      },
    ],
  },
})
