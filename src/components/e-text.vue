<template>
  <p style="font-size: 14px; line-height: 24px; margin: 16px 0" :style="style">
    <slot />
  </p>
</template>

<script lang="ts" setup>
import type { CSSProperties, HTMLAttributes } from 'vue';

interface Props extends /* @vue-ignore */ Omit<HTMLAttributes, 'style'> {
  style?: CSSProperties;
}

defineProps<Props>();
</script>
