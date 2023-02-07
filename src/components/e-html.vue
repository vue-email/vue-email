<template>
  <html id="__vue-email" :lang="lang">
    <slot />
  </html>
</template>

<script lang="ts" setup>
import { HTMLAttributes } from 'vue';

interface Props extends Omit<HTMLAttributes, 'lang'> {
  lang?: string;
}

withDefaults(defineProps<Props>(), {
  lang: 'es',
});
</script>
