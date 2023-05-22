<template>
  <img
    style="display: block; outline: none; border: none; text-decoration: none"
    :style="style"
    :alt="alt"
    :src="src"
    :width="width"
    :height="height"
  />
</template>

<script lang="ts" setup>
import { CSSProperties, HTMLAttributes } from 'vue';

interface Props extends /* @vue-ignore */ Omit<HTMLAttributes, 'style' | 'width' | 'height'> {
  style?: CSSProperties;
  alt: string;
  src: string;
  width: string;
  height: string;
}

withDefaults(defineProps<Props>(), {
  alt: '',
  src: '',
  width: 'auto',
  height: 'auto',
});
</script>
