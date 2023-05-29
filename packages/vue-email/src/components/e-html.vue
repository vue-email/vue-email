<template>
  <html id="__vue-email" :lang="lang" :dir="dir">
    <slot />
  </html>
</template>

<script lang="ts" setup>
import { HTMLAttributes } from 'vue';

interface Props extends /* @vue-ignore */ Omit<HTMLAttributes, 'lang'> {
  lang?: string;
  dir?: 'ltr' | 'rtl' | 'auto';
}

withDefaults(defineProps<Props>(), {
  lang: 'es',
  dir: 'ltr'
});
</script>
