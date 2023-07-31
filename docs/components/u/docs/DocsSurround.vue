<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

const props = defineProps<{ surround?: ParsedContent[] }>()

const [prev, next] = props.surround || []
</script>

<template>
  <div class="grid gap-8 sm:grid-cols-2">
    <UDocsSurroundLink v-if="prev" :link="prev" icon="i-heroicons-arrow-left-20-solid" />
    <span v-else class="hidden sm:block">&nbsp;</span>
    <UDocsSurroundLink v-if="next" :link="next" icon="i-heroicons-arrow-right-20-solid" class="text-right" />
  </div>
</template>
