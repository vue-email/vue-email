<script setup lang="ts">
const colorMode = useColorMode()

const color = computed(() => (colorMode.value === 'dark' ? '#18181b' : 'white'))

useHead({
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, maximum-scale=1',
    },
    { key: 'theme-color', name: 'theme-color', content: color },
  ],
  link: [{ rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' }],
  htmlAttrs: {
    lang: 'en',
  },
  bodyAttrs: {
    class:
      'antialiased font-sans text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900 ',
  },
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
