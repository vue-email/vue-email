<template>
  <html id="__vue-email" :lang="lang">
    <slot />
  </html>
</template>

<script lang="ts" setup>
interface Props extends Omit<HTMLHtmlElement, 'lang'> {
  lang?: string;
}

withDefaults(defineProps<Props>(), {
  lang: 'es',
});
</script>
