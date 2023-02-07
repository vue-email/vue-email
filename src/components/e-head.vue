<template>
  <head>
    <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />

    <slot />
  </head>
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';

interface Props extends HTMLAttributes {}

defineProps<Props>();
</script>
