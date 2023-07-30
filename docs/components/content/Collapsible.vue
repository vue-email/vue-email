<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
</script>

<template>
  <Disclosure v-slot="{ open }">
    <DisclosureButton class="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
      <UIcon name="i-heroicons-chevron-right-20-solid" class="w-4 h-4" :class="[open && 'rotate-90']" />
      <span>{{ open ? 'Hide' : 'Show' }} properties</span>
    </DisclosureButton>

    <DisclosurePanel class="mt-4 ml-2 py-2.5 pl-4 border-l border-gray-200 dark:border-gray-800">
      <ContentSlot unwrap="p" :use="$slots.default" />
    </DisclosurePanel>
  </Disclosure>
</template>
