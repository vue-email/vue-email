import { defineNuxtPlugin, useRuntimeConfig } from '#imports'
import create from './src/create'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const UI = create(config.vueEmailOptions)

  nuxtApp.vueApp.use(UI)
})
