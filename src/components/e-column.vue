<template>
  <td :style="style" role="presentation">
    <slot />
  </td>
</template>

<script lang="ts" setup>
import type { CSSProperties, HTMLAttributes } from 'vue';

interface Props extends /* @vue-ignore */ Omit<HTMLAttributes, 'style'> {
  style?: CSSProperties;
}

defineProps<Props>();
</script>
