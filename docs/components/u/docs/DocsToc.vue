<script setup lang="ts">
import type { TocLink } from '@nuxt/content/dist/runtime/types'

defineProps<{ links: TocLink[] }>()

const appConfig = useAppConfig()

const isTocOpen = ref(false)
</script>

<template>
  <nav
    class="sticky top-[--header-height] bg-background/75 backdrop-blur group lg:self-start -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:pl-8 lg:pr-0 overflow-y-auto max-h-[calc(100vh-var(--header-height))]"
  >
    <div class="py-3 lg:py-8 border-b border-dashed border-gray-200 dark:border-gray-800 lg:border-0 space-y-3">
      <slot name="top" />

      <button class="flex items-center gap-2 lg:cursor-text lg:select-text w-full" tabindex="-1" @click="isTocOpen = !isTocOpen">
        <span class="text-gray-900 font-semibold text-sm leading-6 dark:text-gray-200 truncate">Table of Contents</span>

        <UIcon
          :name="appConfig.ui.accordion.default.openIcon"
          class="w-5 h-5 ms-auto transform transition-transform duration-200 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 lg:hidden"
          :class="[isTocOpen ? 'text-gray-900 dark:text-gray-200' : '-rotate-90']"
        />
      </button>

      <UDocsTocLinks :links="links" :class="[isTocOpen ? 'lg:block' : 'hidden lg:block']" />

      <slot name="bottom" />
    </div>
  </nav>
</template>
