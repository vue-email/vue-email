import { VueEmailPlugin } from 'vue-email'
import { defineNuxtPlugin, useRuntimeConfig } from '#imports'

export default defineNuxtPlugin(
  (nuxtApp) => {
    // Add MotionPlugin
    nuxtApp.vueApp.use(VueEmailPlugin)
  }
)
