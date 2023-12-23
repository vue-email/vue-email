<script setup lang="ts">
import { EHead, EHtml, ETailwind, EText } from 'vue-email'
import MyFooter from './MyFooter.vue'
</script>

<template>
  <ETailwind>
    <EHtml>
      <EHead />

      <slot />
      <EText class="text-accent text-center">
        BaseEmail Component
      </EText>
      <MyFooter />
    </EHtml>
  </ETailwind>
</template>
