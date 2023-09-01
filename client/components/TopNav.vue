<script setup lang="ts">
import { version } from '../../package.json'
</script>

<template>
  <div class="flex relative flex-col md:flex-row items-center justify-between gap-3 py-3 h-auto md:h-10">
    <NuxtLoadingIndicator :throttle="0" :height="5" />
    <div class="flex items-center gap-2 text-xl">
      <NuxtLink to="/" class="flex items-center gap-2">
        <UIcon name="i-twemoji-incoming-envelope" />
        <h2 class="font-semibold text-gray-900 dark:text-white leading-tight">Vue Email</h2>
      </NuxtLink>
      <NuxtLink class="flex items-center gap-2" target="_blank" :to="`https://github.com/Dave136/vue-email/releases/tag/v${version}`">
        <UBadge color="primary" variant="subtle"> v{{ version }} </UBadge>
      </NuxtLink>
    </div>

    <HeaderButtons />
  </div>
</template>
