import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addComponentsDir,
  addImportsDir,
} from '@nuxt/kit'
import { fileURLToPath } from 'node:url'

export default defineNuxtModule({
  meta: {
    name: 'vue-email',
    configKey: 'vueEmail',
  },
  defaults: {},
  setup(options, nuxt) {
    // Create resolver to resolve relative paths
    const { resolve } = createResolver(import.meta.url)

    nuxt.options.runtimeConfig.public.vueEmailOptions = options

    // plugin install
    addPlugin(resolve('./nuxt.plugin.js'))

    // nuxt install
    addComponentsDir({
      path: fileURLToPath(new URL('./src/components', import.meta.url)),
      extensions: ['vue', 'tsx'],
      prefix: 'E',
    })

    addImportsDir(resolve('./src/composables'))
  },
})
