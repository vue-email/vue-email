<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo'
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

const searchRef = ref()

const route = useRoute()
const colorMode = useColorMode()

const { data: nav } = await useAsyncData('navigation', () => fetchContentNavigation())
const { data: files } = useLazyFetch<ParsedContent[]>('/api/search.json', { default: () => [], server: false })

// Computed

const navigation = computed(() => nav.value)
const links = computed(() => {
  return [
    {
      label: 'Documentation',
      icon: 'i-heroicons-book-open-solid',
      to: '/getting-started',
    },
    {
      label: 'Examples',
      icon: 'i-heroicons-square-3-stack-3d',
      to: '/getting-started/examples',
    },
    {
      label: 'Playground',
      icon: 'i-simple-icons-stackblitz',
      to: '/playground',
    },
    {
      label: 'Releases',
      icon: 'i-heroicons-rocket-launch-solid',
      to: '/changelog',
    },
  ]
})
const color = computed(() => (colorMode.value === 'dark' ? '#18181b' : 'white'))

// Head

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color },
  ],
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' },
    { rel: 'canonical', href: `https://www.vuemail.net${withoutTrailingSlash(route.path)}` },
  ],
  htmlAttrs: {
    lang: 'en',
  },
})

useServerSeoMeta({
  ogSiteName: 'Vue Email',
  twitterCard: 'summary_large_image',
})

// Provide

provide('navigation', navigation)
provide('files', files)
provide('links', links)
</script>

<template>
  <div>
    <Header />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <Footer />

    <ClientOnly>
      <LazyUDocsSearch ref="searchRef" :files="files" :navigation="navigation" />
    </ClientOnly>

    <UNotifications>
      <template #title="{ title }">
        <span v-html="title" />
      </template>

      <template #description="{ description }">
        <span v-html="description" />
      </template>
    </UNotifications>
  </div>
</template>
