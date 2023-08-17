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
  <UNotifications />
</template>

<style></style>
