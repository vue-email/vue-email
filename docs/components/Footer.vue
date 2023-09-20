<script setup lang="ts">
const links = inject<Ref<any[]>>('links')
</script>

<template>
  <div v-if="$route.path !== '/playground'" class="w-full h-px bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
    <div class="px-4">
      <Logo class="w-5 h-5" />
    </div>
  </div>

  <UFooter :links="links" :ui="{ bottom: { container: 'lg:py-4' } }">
    <template #left>
      <span class="text-sm"> Published under <NuxtLink to="https://github.com/Dave136/vue-email" target="_blank" class="underline"> MIT License </NuxtLink> </span>
    </template>

    <template #right>
      <UColorModeButton v-if="!$colorMode.forced" />
      <UButton aria-label="Vue Email on GitHub" icon="i-simple-icons-github" to="https://github.com/Dave136/vue-email" target="_blank" color="gray" variant="ghost" />
    </template>
  </UFooter>
</template>
