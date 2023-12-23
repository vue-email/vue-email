<script setup lang="ts">
import { ESection, ETailwind, EText } from '../../src/components'
import MyFooter from './MyFooter.vue'
</script>

<template>
  <ETailwind>
    <ESection>
      <slot />
      <EText class="text-accent text-center base-email">
        BaseEmail Component
      </EText>
      <MyFooter />
    </ESection>
  </ETailwind>
</template>
