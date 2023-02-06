<template>
  <head>
    <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />

    <slot />
  </head>
</template>

<script lang="ts" setup>
interface Props extends HTMLHeadElement {}

defineProps<Props>();
</script>
