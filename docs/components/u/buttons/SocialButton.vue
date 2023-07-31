<script setup lang="ts">
defineProps<{
  icon: string
  to: string
}>()
</script>

<template>
  <UButton :to="to" :icon="icon" target="_blank" color="gray" variant="ghost" />
</template>
