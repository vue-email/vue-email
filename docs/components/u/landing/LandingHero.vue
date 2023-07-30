<script setup lang="ts">
import type { Button } from '@nuxthq/ui/dist/runtime/types'

withDefaults(
  defineProps<{
    title?: string
    description?: string
    links?: Button[]
    direction?: 'vertical' | 'horizontal'
  }>(),
  {
    title: '',
    description: '',
    links: () => [],
    direction: 'vertical',
  },
)
</script>

<template>
  <div class="py-24 sm:py-32 md:py-40">
    <UContainer class="relative">
      <div :class="[direction === 'vertical' && 'text-center']">
        <h1 class="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-7xl">
          <slot name="title">
            {{ title }}
          </slot>
        </h1>
        <p v-if="description || $slots.description" class="mt-6 text-lg tracking-tight text-gray-700 dark:text-gray-200">
          <slot name="description">
            {{ description }}
          </slot>
        </p>

        <div v-if="links?.length || $slots.default" class="mt-10 flex flex-wrap gap-x-6 gap-y-3" :class="[direction === 'vertical' && 'justify-center']">
          <slot name="links">
            <UButton v-for="(link, index) in links" :key="index" v-bind="link" />
          </slot>
        </div>
      </div>

      <div v-if="$slots.default" :class="[direction === 'vertical' && 'mt-16 sm:mt-24']">
        <slot />
      </div>
    </UContainer>
  </div>
</template>
