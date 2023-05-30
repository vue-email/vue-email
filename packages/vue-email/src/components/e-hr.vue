<template>
  <hr
    v-bind="$props"
    data-id="__vue-email-hr"
    style="width: 100%; border: none; border-top: 1px solid #eaeaea"
    :style="style"
  />
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';

interface Props extends /* @vue-ignore */ Omit<HTMLAttributes, 'style'> {
  style?: any;
}

defineProps<Props>();
</script>
