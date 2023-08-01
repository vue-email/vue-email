<script setup lang="ts">
import type { FooterLink } from 'types'

defineProps<{
  links?: FooterLink[]
}>()
</script>

<template>
  <footer class="relative">
    <UContainer class="py-8 md:py-12 md:flex md:items-center md:justify-between">
      <div class="flex items-center justify-center gap-1.5 md:order-3">
        <slot name="right" />
      </div>

      <slot name="center">
        <UFooterLinks :links="links" class="mt-4 md:mt-0 md:order-2" />
      </slot>

      <div class="mt-4 md:mt-0 md:order-1 gap-1.5">
        <slot name="left"> Copyright &copy; {{ new Date().getFullYear() }} </slot>
      </div>
    </UContainer>
  </footer>
</template>
