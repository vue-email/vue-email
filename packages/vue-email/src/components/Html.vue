<script lang="ts">
export default { name: 'EHtml' }
</script>

<template>
  <html id="__vue-email" :lang="lang" :dir="dir">
    <slot></slot>
  </html>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

defineProps({
  lang: {
    type: String,
    default: 'en',
  },
  dir: {
    type: String as PropType<'ltr' | 'rtl' | 'auto'>,
    default: 'ltr',
  },
})
</script>
