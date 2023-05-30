<template>
  <html v-bind="$props" id="__vue-email" :lang="lang" :dir="dir">
    <slot />
  </html>
</template>

<script lang="ts" setup>
import { HtmlHTMLAttributes } from 'vue';

interface Props extends /* @vue-ignore */ Omit<HtmlHTMLAttributes, 'lang'> {
  lang?: string;
  dir?: 'ltr' | 'rtl' | 'auto';
}

withDefaults(defineProps<Props>(), {
  lang: 'es',
  dir: 'ltr',
});
</script>
