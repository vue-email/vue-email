<script setup lang="ts">
import { ETailwind, EText } from '../../src/components'
import MyFooter from './MyFooter.vue'
</script>

<template>
  <ETailwind>
    <slot />
    <EText class="text-accent text-center">
      BaseEmail Component
    </EText>
    <MyFooter />
  </ETailwind>
</template>
