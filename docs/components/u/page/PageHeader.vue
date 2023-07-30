<script setup lang="ts">
import type { Button } from '@nuxthq/ui/dist/runtime/types'

withDefaults(
  defineProps<{
    headline?: string
    title?: string
    description?: string
    links?: Button[]
  }>(),
  {
    headline: undefined,
    title: '',
    description: '',
    links: () => [],
  },
)
</script>

<template>
  <div class="relative border-b border-gray-200 dark:border-gray-800 py-8 mb-12">
    <p v-if="headline" class="mb-4 text-sm leading-6 font-semibold text-primary-500 dark:text-primary-400 capitalize">
      {{ headline }}
    </p>
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
      <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight dark:text-white">
        {{ title }}
      </h1>

      <div v-if="links?.length" class="flex items-center gap-2 mt-4 lg:mt-0">
        <UButton v-for="(button, index) of links" :key="index" v-bind="{ ...button, target: button.target || '_blank', color: button.color || 'white' }" />
      </div>
    </div>
    <p v-if="description" class="mt-4 text-lg text-gray-500 dark:text-gray-400">
      {{ description }}
    </p>
  </div>
</template>
