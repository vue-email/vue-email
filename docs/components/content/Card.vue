<script setup lang="ts">
defineProps({
  icon: {
    type: String,
    default: null,
  },
  color: {
    type: String,
    default: 'text-primary-500 dark:text-primary-400',
  },
  to: {
    type: String,
    default: null,
  },
  title: {
    type: String,
    default: null,
  },
})
</script>

<template>
  <UCard
    class="relative overflow-hidden flex items-center"
    :class="[to && 'hover:ring-2 hover:ring-primary-500 dark:hover:ring-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800/50']"
  >
    <NuxtLink v-if="to" :to="to" class="focus:outline-none" tabindex="-1">
      <span class="absolute inset-0" aria-hidden="true" />
    </NuxtLink>

    <UIcon v-if="icon" :name="icon" class="w-8 h-8 mb-4 inline-flex items-center align-text-top" :class="color" />

    <p class="text-gray-900 dark:text-white font-medium text-base my-0">
      {{ title }}
    </p>

    <p v-if="$slots.default" class="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-0">
      <ContentSlot unwrap="p" :use="$slots.default" />
    </p>
  </UCard>
</template>
