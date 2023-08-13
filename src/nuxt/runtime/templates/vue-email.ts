import { VueEmailPlugin } from 'vue-email'
import {defineNuxtPlugin, useRuntimeConfig } from "#app"

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig()
  const { i18n: _, pluginOptions } = config

  nuxtApp.vueApp.use(VueEmailPlugin, pluginOptions)
})
