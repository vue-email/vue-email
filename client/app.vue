<script setup lang="ts">
useHead({
  titleTemplate: (title) => (title && title.includes('Vue Email') ? title : `${title} - Vue Email`),
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, maximum-scale=1',
    },
  ],
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/icon.svg' }],
  htmlAttrs: {
    lang: 'en',
  },
  bodyAttrs: {
    class: 'antialiased font-sans text-gray-200 bg-gray-900',
  },
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
