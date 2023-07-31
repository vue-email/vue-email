<script setup lang="ts">
const config = useRuntimeConfig().public
</script>

<template>
  <footer class="flex items-center gap-1.5 mt-12">
    <div class="flex-1 flex items-baseline gap-1.5 text-sm text-gray-600 dark:text-gray-300 leading-6">
      Made With
      <NuxtLink to="https://ui.nuxtlabs.com/getting-started" aria-label="NuxtUi"> Nuxt UI </NuxtLink>
    </div>

    <NuxtLink :to="`https://github.com/Dave136/vue-email/releases/tag/v${config.version}`" target="_blank" class="inline-flex">
      <UBadge :label="`v${config.version}`" />
    </NuxtLink>

    <div class="flex-1 flex items-center justify-end gap-1.5 -my-1 lg:hidden">
      <!-- <UButtonsSocialButton to="https://twitter.com/nuxtlabs" target="_blank" icon="i-simple-icons-twitter" /> -->
      <UButtonsSocialButton to="https://github.com/Dave136/vue-email" target="_blank" icon="i-simple-icons-github" />
    </div>
  </footer>
</template>
