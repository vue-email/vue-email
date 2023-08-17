<script setup lang="ts">
import { version } from '../../package.json'
</script>

<template>
  <UCard
    class="w-full"
    :ui="{
      base: '',
      ring: '',
      divide: 'divide-y divide-gray-200 dark:divide-gray-700',
      body: { padding: '', base: 'divide-y divide-gray-200 dark:divide-gray-700' },
      footer: { padding: 'p-4' },
    }"
  >
    <template #header>
      <div class="flex items-center justify-between gap-3 py-3 h-10">
        <NuxtLink to="/" class="flex items-center gap-2 text-xl">
          <UIcon name="i-twemoji-incoming-envelope" />
          <h2 class="font-semibold text-gray-900 dark:text-white leading-tight">Vue Email</h2>
          <UBadge color="primary" variant="subtle"> v{{ version }} </UBadge>
        </NuxtLink>

        <HeaderButtons />
      </div>
    </template>

    <main class="">
      <slot />
    </main>

    <!-- <template #footer>
        <div class="flex items-center justify-center">
          <UBadge color="primary" variant="subtle"> v{{ version }} </UBadge>
        </div>
      </template> -->
  </UCard>

  <CommandPalette />
</template>

<style>
main {
  /* calculate 100% - 40px */
  /* height: calc(100vh - 85px); */
}
</style>
