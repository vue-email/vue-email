<script setup lang="ts">
defineProps({
  error: {
    type: Object,
    default: () => ({}),
  },
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="min-h-[calc(100vh-var(--header-height))] flex flex-col items-center justify-center">
    <p class="text-base font-semibold text-primary-500 dark:text-primary-400">
      {{ error.statusCode || 404 }}
    </p>
    <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
      {{ error.name || error.statusMessage || 'Page not found' }}
    </h1>
    <p class="mt-6 text-base leading-7 text-gray-500 dark:text-gray-400">
      {{ error.message || "This is not the page you're looking for." }}
    </p>
    <div class="mt-10 flex items-center justify-center gap-x-6">
      <UButton label="Go back home" @click="handleError" />
    </div>
  </div>
</template>
