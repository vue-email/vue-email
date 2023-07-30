<script setup lang="ts">
defineProps<{ prose?: boolean }>()
</script>

<template>
  <div class="mt-8 pb-24" :class="[prose && 'prose prose-primary dark:prose-invert max-w-none']">
    <slot />
  </div>
</template>
