<script lang="ts">
export default { name: 'EIcon' }
</script>

<template>
  <img data-id="__vue-email-icon" style="display: block; outline: none; border: none; text-decoration: none" :src="src"
    :width="sSize" :height="sSize" />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: Number,
    default: 24,
  },
  name: {
    type: String,
    default: '',
  },
})

const iconName = computed(() => props.name)
const src = computed(() =>
  iconName.value
    ? `https://api.iconify.design/${iconName.value.replace(
      ':',
      '/',
    )}.svg`
    : '',
)
const sSize = computed(() => {
  return `${props.size}px`
})
</script>
