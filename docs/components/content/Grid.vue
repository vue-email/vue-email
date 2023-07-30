<script setup lang="ts">
defineProps({
  columns: {
    type: String,
    default: 'sm:grid-cols-2',
  },
  gap: {
    type: String,
    default: 'gap-5',
  },
})
</script>

<template>
  <div class="grid" :class="[columns, gap]">
    <ContentSlot unwrap="p" :use="$slots.default" />
  </div>
</template>
