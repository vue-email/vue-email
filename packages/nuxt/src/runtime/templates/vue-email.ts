import { VueEmailPlugin } from 'vue-email'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import type { VueEmailPluginOptions } from '@vue-email/types'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const options = config.public['vueEmailOptions'] as VueEmailPluginOptions

  nuxtApp.vueApp.use(VueEmailPlugin, options)
})
