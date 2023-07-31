<script setup lang="ts">
import type { Button } from '@nuxthq/ui/dist/runtime/types'

withDefaults(
  defineProps<{
    icon?: string
    title?: string
    description?: string
    links?: Button[]
    slot?: string
    align?: 'left' | 'center' | 'right'
  }>(),
  {
    icon: undefined,
    title: '',
    description: '',
    links: () => [],
    slot: undefined,
    align: 'left',
  },
)
</script>

<template>
  <div class="py-8 sm:py-16">
    <div :class="[align !== 'center' && 'lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-center']">
      <div :class="[align === 'center' && 'text-center', align === 'right' && 'lg:order-last']">
        <div v-if="icon" class="relative rounded-lg flex items-center justify-center mb-6 w-10 h-10 bg-primary-500 dark:bg-primary-400 flex-shrink-0">
          <UIcon :name="icon" class="w-6 h-6 flex-shrink-0 text-white" />
        </div>

        <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
          <slot name="title">
            {{ title }}
          </slot>
        </h2>

        <p v-if="description || $slots.description" class="mt-4 text-lg text-gray-500 dark:text-gray-400">
          <slot name="description">
            {{ description }}
          </slot>
        </p>

        <div v-if="links?.length || $slots.default" class="mt-8 flex flex-wrap gap-x-3 gap-y-1.5" :class="[align === 'center' && 'justify-center']">
          <slot name="links">
            <UButton v-for="(link, index) in links" :key="index" v-bind="link" />
          </slot>
        </div>
      </div>

      <div v-if="$slots[slot || 'default']" :class="[align === 'center' && 'mt-16 sm:mt-24']">
        <slot :name="slot || 'default'" />
      </div>
      <div v-else-if="align === 'right'" />
    </div>
  </div>
</template>
