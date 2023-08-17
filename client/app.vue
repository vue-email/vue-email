<script setup lang="ts">
const { emails } = useEmail()

const emailsNumber = computed(() => (emails.value ? `${emails.value.length} email${emails.value.length > 1 ? 's' : ''}` : '0 email'))

const { toggleCommandPallet } = useTool()

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
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
