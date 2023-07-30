import { computed } from 'vue'
import { isClient } from '@vueuse/core'
import { defineNuxtPlugin, useAppConfig, useHead } from '#imports'

export default defineNuxtPlugin(() => {
  const appConfig = useAppConfig()
  const nuxtApp = useNuxtApp()

  const root = computed(() => {
    return `:root {
  --header-height: ${appConfig.uiKit.variables.header.height};
  --background: ${appConfig.uiKit.variables.light.background};
  --foreground: ${appConfig.uiKit.variables.light.foreground};
  --border: ${appConfig.uiKit.variables.light.border};
}

.dark {
  --background: ${appConfig.uiKit.variables.dark.background};
  --foreground: ${appConfig.uiKit.variables.dark.foreground};
  --border: ${appConfig.uiKit.variables.dark.border};
}`
  })

  // Head
  const headData: any = {
    style: [
      {
        innerHTML: () => root.value,
        tagPriority: -2,
        id: 'nuxt-ui-kit-variables',
      },
    ],
  }

  // SPA mode
  if (isClient && nuxtApp.isHydrating && !nuxtApp.payload.serverRendered) {
    const style = document.createElement('style')

    style.innerHTML = root.value
    style.setAttribute('data-nuxt-ui-kit-variables', '')
    document.head.appendChild(style)

    headData.script = [
      {
        innerHTML: "document.head.removeChild(document.querySelector('[data-nuxt-ui-kit-variables]'))",
      },
    ]
  }

  useHead(headData)
})
