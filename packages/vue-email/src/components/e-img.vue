<template>
  <img
    v-bind="$props"
    data-id="__vue-email-img"
    style="display: block; outline: none; border: none; text-decoration: none"
    :style="style"
    :alt="alt"
    :src="src"
    :width="width ?? $props.width"
    :height="height ?? $props.height"
  />
</template>

<script lang="ts" setup>
import { ImgHTMLAttributes } from 'vue';

interface Props extends /* @vue-ignore */ Omit<ImgHTMLAttributes, 'style' | 'width' | 'height'> {
  style?: any;
  alt?: string;
  src: string;
  width?: string;
  height?: string;
}

defineProps<Props>();
</script>
