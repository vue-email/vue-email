<script setup lang="ts">
import { resolveComponent } from 'vue'

const emailTemplate = resolveComponent('EmailTemplate') as Component

const html = await useRender(emailTemplate, undefined, {
  pretty: true,
})
</script>

<template>
  <iframe :srcdoc="html" class="h-[600px] w-full" frameborder="0" width="100%" />
</template>
