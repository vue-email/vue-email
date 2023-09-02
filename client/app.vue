<script setup lang="ts">
useHead({
  title: 'Vue Email Devtools',
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
    class: 'antialiased font-sans overflow-hidden',
  },
})

const { getEmails } = useEmail()

await getEmails()
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
