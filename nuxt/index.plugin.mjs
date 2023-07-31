import { defineNuxtPlugin, useRuntimeConfig } from '#imports'
import { VueEmailPlugin } from 'vue-email'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  nuxtApp.vueApp.use(VueEmailPlugin, config.public.vueEmailOptions)
})
