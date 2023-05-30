<template>
  <p
    v-bind="$props"
    data-id="__vue-email-text"
    style="font-size: 14px; line-height: 24px; margin: 16px 0"
    :style="style"
  >
    <slot />
  </p>
</template>

<script lang="ts" setup>
import type { StyleValue, HTMLAttributes } from 'vue';

type RootAttributes = Omit<HTMLAttributes, 'style'>;

interface Props extends /* @vue-ignore */ RootAttributes {
  style?: StyleValue;
}

defineProps<Props>();
</script>
