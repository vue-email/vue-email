<template>
  <td v-bind="$props" data-id="__vue-email-column" :style="style" role="presentation">
    <slot />
  </td>
</template>

<script lang="ts" setup>
import type { TdHTMLAttributes } from 'vue';

interface Props extends /* @vue-ignore */ Omit<TdHTMLAttributes, 'style'> {
  style?: any;
}

defineProps<Props>();
</script>
