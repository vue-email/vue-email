<script setup lang="ts">
const colorMode = useColorMode()

const { data: links } = await useAsyncData('navigation', () => fetchContentNavigation(), {
  transform: (navigation) => mapContentLinks(navigation),
})

const { data: files } = await useLazyAsyncData(
  'files',
  () =>
    queryContent()
      .where({ _type: 'markdown', navigation: { $ne: false } })
      .find(),
  { default: () => [] },
)

provide('links', links)

const anchors = [
  {
    label: 'Documentation',
    icon: 'i-heroicons-book-open-solid',
    to: '/getting-started',
  },
  {
    label: 'Playground',
    icon: 'i-simple-icons-stackblitz',
    to: 'https://vue-email-demo.vercel.app/',
    target: '_blank',
  },
  {
    label: 'Releases',
    icon: 'i-heroicons-rocket-launch-solid',
    to: 'https://github.com/Dave136/vue-email/releases',
    target: '_blank',
  },
]

// Computed

const color = computed(() => (colorMode.value === 'dark' ? '#18181b' : 'white'))
const config = useRuntimeConfig().public

// Head

useHead({
  titleTemplate: (title) => (title && title.includes('VueEmail') ? title : `${title} - Build and send emails using Vue`),
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color },
  ],
  link: [{ rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' }],
  htmlAttrs: {
    lang: 'en',
  },
  bodyAttrs: {
    class: 'antialiased font-sans text-foreground bg-background',
  },
})

useSeoMeta({
  ogImage: '/social-preview.jpg',
  twitterImage: '/social-preview.jpg',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div>
    <UHeader>
      <template #left>
        <NuxtLink to="/getting-started" class="flex items-end gap-1.5 font-bold text-xl text-gray-900 dark:text-white">
          <Logo class="w-8 h-8" />

          <span class="hidden sm:block"><span class="sm:text-primary-500 dark:sm:text-primary-400">Vue</span>Email</span>
        </NuxtLink>
      </template>

      <template #center>
        <UDocsSearchButton class="ml-1.5 flg:w-64 xl:w-96" />
      </template>

      <template #right>
        <NuxtLink :to="`https://github.com/Dave136/vue-email/releases/tag/v${config.version}`" target="_blank" class="inline-flex">
          <UBadge :label="`v${config.version}`" variant="subtle" />
        </NuxtLink>
        <ColorModeButton />
        <UButtonsSocialButton to="https://github.com/Dave136/vue-email" target="_blank" icon="i-simple-icons-github" class="hidden lg:inline-flex" />
      </template>

      <template #links>
        <UAsideAnchors :links="anchors" />
        <UAsideLinks :links="links" />
      </template>
    </UHeader>

    <UMain>
      <UContainer>
        <UPage>
          <template #left>
            <UAside :links="links" :anchors="anchors" />
          </template>

          <NuxtPage />
        </UPage>
      </UContainer>
    </UMain>

    <ClientOnly>
      <UDocsSearch :files="files" :links="links" />
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
