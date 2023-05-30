<template>
  <body v-bind="$props" data-id="__vue-email-body" :style="style">
    <slot />
  </body>
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';

interface Props extends /* @vue-ignore */ Omit<HTMLAttributes, 'style'> {
  style?: any;
}

defineProps<Props>();
</script>
