<script setup lang="ts">
import { omit } from 'lodash-es'
import type { HeaderLink } from 'types'

defineProps<{
  links?: HeaderLink[]
}>()
</script>

<template>
  <ul v-if="links?.length" class="flex gap-x-8">
    <li v-for="(link, index) of links" :key="index">
      <ULinkCustom
        v-bind="omit(link, ['label'])"
        class="text-sm leading-6 font-semibold"
        active-class="text-primary-500 dark:text-primary-400"
        inactive-class="text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400"
      >
        {{ link.label }}
      </ULinkCustom>
    </li>
  </ul>
</template>
