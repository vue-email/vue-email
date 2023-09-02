<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{
  error: NuxtError
}>()

useSeoMeta({
  title: 'Page not found',
  description: 'We are sorry but this page could not be found.',
})

const { data: navigation } = await useLazyAsyncData('navigation', () => fetchContentNavigation())

const { data: files } = await useLazyAsyncData('files', () =>
  queryContent()
    .where({ _type: 'markdown', navigation: { $ne: false } })
    .find(),
)

// Provide

provide('navigation', navigation)
provide('files', files)
</script>

<template>
  <div>
    <Header />

    <UContainer>
      <UMain>
        <UPage>
          <UPageError :error="error" />
        </UPage>
      </UMain>
    </UContainer>

    <ClientOnly>
      <UDocsSearch :files="files" :navigation="navigation" />
    </ClientOnly>

    <UNotifications />
  </div>
</template>
