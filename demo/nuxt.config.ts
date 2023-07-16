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
  hooks: {
    'nitro:build:public-assets': (nitro) => {
      // move a copy of emails folder to .output/public
      const fs = require('fs')
      const path = require('path')
      const source = path.resolve(__dirname, 'emails')
      const destination = path.resolve(nitro.options.output.publicDir, 'emails')

      // if no destination folder, create it
      if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, { recursive: true })
      } else {
        // if destination folder exists, delete it
        fs.rmdirSync(destination, { recursive: true })
        fs.mkdirSync(destination, { recursive: true })
      }

      fs.readdirSync(source).forEach((file: string) => {
        fs.copyFileSync(path.join(source, file), path.join(destination, file))
      })
    },
  },
})
