<script setup lang="ts">
import { omit } from 'lodash-es'
import type { FooterLink } from 'types'

defineProps<{
  links?: FooterLink[]
}>()
</script>

<template>
  <ul v-if="links?.length" class="flex items-center justify-center gap-x-4 lg:gap-x-6 overflow-x-auto">
    <li v-for="(link, index) of links" :key="index">
      <ULinkCustom
        v-bind="omit(link, ['label'])"
        class="text-sm"
        active-class="text-gray-900 dark:text-white font-medium"
        inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
      >
        {{ link.label }}
      </ULinkCustom>
    </li>
  </ul>
</template>
