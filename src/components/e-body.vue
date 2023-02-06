<template>
  <body :style="style">
    <slot />
  </body>
</template>

<script lang="ts" setup>
import type { HTMLAttributes, CSSProperties } from 'vue';

interface Props extends Omit<HTMLAttributes, 'style'> {
  style?: CSSProperties;
}

defineProps<Props>();
</script>
