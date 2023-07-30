<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

defineProps<{
  link: ParsedContent
  icon?: string
}>()
</script>

<template>
  <NuxtLink :to="link._path" class="block px-6 py-8 border not-prose rounded-lg border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 group">
    <div
      v-if="icon || link.icon"
      class="inline-flex items-center rounded-full p-1.5 bg-gray-50 dark:bg-gray-800 group-hover:bg-primary-50 dark:group-hover:bg-primary-400/10 ring-1 ring-gray-300 dark:ring-gray-700 mb-4 group-hover:ring-primary-500/50 dark:group-hover:ring-primary-400/50"
    >
      <UIcon :name="icon || link.icon" class="w-5 h-5 text-gray-900 dark:text-gray-100 group-hover:text-primary-500 dark:group-hover:text-primary-400" />
    </div>

    <p class="text-gray-900 dark:text-gray-50 font-medium text-[15px] mb-1">
      {{ link.title }}
    </p>

    <p class="text-sm font-normal text-gray-500 dark:text-gray-400">
      {{ link.description }}
    </p>
  </NuxtLink>
</template>
