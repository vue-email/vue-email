<script setup lang="ts">
import { omit } from 'lodash-es'

defineProps<{ links?: Link[] }>()
</script>

<template>
  <div v-if="links?.length" class="space-y-4 mb-4 lg:mb-8">
    <ULinkCustom
      v-for="(link, index) in links"
      :key="index"
      v-slot="{ isActive }"
      v-bind="omit(link, ['label', 'icon', 'iconClass'])"
      class="flex items-center gap-2 group"
      active-class="text-primary-500 dark:text-primary-400 font-semibold"
      inactive-class="text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 border-transparent hover:border-gray-400 dark:hover:border-gray-500 font-medium"
    >
      <div
        v-if="link.icon"
        class="rounded-md p-1 inline-flex ring-inset ring-1 ring-gray-300 dark:ring-gray-700"
        :class="[
          isActive
            ? 'bg-primary-500 dark:bg-primary-400 ring-primary-500 dark:ring-primary-400 text-white dark:text-gray-900'
            : 'bg-gray-50 dark:bg-gray-800/50 group-hover:bg-primary-500 dark:group-hover:bg-primary-400 group-hover:ring-primary-500 dark:group-hover:ring-primary-400 group-hover:text-white dark:group-hover:text-gray-900',
        ]"
      >
        <UIcon v-if="link.icon" :name="link.icon" class="w-4 h-4 flex-shrink-0" :class="link.iconClass" />
      </div>

      <span class="text-sm leading-6">{{ link.label }}</span>
    </ULinkCustom>
  </div>
</template>
