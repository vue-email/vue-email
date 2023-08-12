import { VueEmailPlugin } from 'vue-email'
import { defineNuxtPlugin, useRuntimeConfig } from '#imports'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  nuxtApp.vueApp.use(VueEmailPlugin, config.public.vueEmailOptions)
})
