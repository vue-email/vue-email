<script setup lang="ts">
const { isDocsSearchOpen } = useUIKit()
const { metaSymbol } = useShortcuts()
</script>

<template>
  <UButton
    color="white"
    variant="outline"
    icon="i-heroicons-magnifying-glass-20-solid"
    label="Search..."
    class="flex-1"
    truncate
    :ui="{
      font: '',
      color: {
        white: {
          outline:
            'ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:ring-gray-300 dark:hover:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400',
        },
      },
    }"
    @click="isDocsSearchOpen = true"
  >
    <template #trailing>
      <div class="hidden lg:flex items-center gap-0.5 ml-auto -my-1 flex-shrink-0">
        <UKbd>
          {{ metaSymbol }}
        </UKbd>
        <UKbd> K </UKbd>
      </div>
    </template>
  </UButton>
</template>
