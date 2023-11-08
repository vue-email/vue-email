import { VueEmailPlugin } from '@vue-email/core'
import type { VueEmailPluginOptions } from '@vue-email/types'
import { defineNuxtPlugin, useRuntimeConfig } from '#imports'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const options = config.public['vueEmailOptions'] as VueEmailPluginOptions

  nuxtApp.vueApp.use(VueEmailPlugin, options)
})
