import { VueEmailPlugin, VueEmailPluginOptions } from 'vue-email'
import {defineNuxtPlugin, useRuntimeConfig } from "#app"

export default defineNuxtPlugin((nuxtApp) => {
  const options = useRuntimeConfig().public.vueEmail as VueEmailPluginOptions

  nuxtApp.vueApp.use(VueEmailPlugin, options)
})
