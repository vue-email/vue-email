import { VueEmailPlugin, VueEmailPluginOptions } from 'vue-email'
import {defineNuxtPlugin, useRuntimeConfig } from "#app"

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig()
  const options = config.public['vueEmailOptions'] as VueEmailPluginOptions

  nuxtApp.vueApp.use(VueEmailPlugin, options)  
})
