<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: null,
  },
  type: {
    type: String,
    default: 'string',
  },
  required: {
    type: Boolean,
    default: false,
  },
  default: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="mt-5">
    <div class="flex items-center gap-x-2.5 font-mono text-sm">
      <div class="flex flex-1 gap-x-2.5">
        <span class="rounded-md font-semibold text-primary-500 dark:text-primary-400">{{ name }}</span>
        <span v-if="required" class="text-gray-500 dark:text-gray-400">required</span>
        <span v-else-if="default" class="text-gray-500 dark:text-gray-400">Default: {{default}}</span>
      </div>
      <div class="text-right text-gray-700 dark:text-gray-200">
        {{ type }}
      </div>
    </div>

    <p v-if="description" class="mt-3 mb-0 text-gray-600 dark:text-gray-300 text-sm space-y-3">
      <ContentSlot :use="$slots.default">
        {{ description }}
      </ContentSlot>
    </p>
  </div>
</template>
