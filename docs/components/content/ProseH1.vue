<script setup lang="ts">
defineProps<{ id: string }>()
</script>

<template>
  <h2 :id="id" class="scroll-mt-[calc(48px+48px+var(--header-height))] lg:scroll-mt-[calc(48px+var(--header-height))]">
    <NuxtLink :href="id ? `#${id.trim()}` : null" class="group">
      <div class="-ml-6 pr-2 py-2 inline-flex opacity-0 group-hover:lg:opacity-100 transition-opacity absolute">
        <UIcon name="i-heroicons-hashtag-20-solid" class="w-4 h-4 text-primary-500 dark:text-primary-400" />
      </div>

      <slot />
    </NuxtLink>
  </h2>
</template>
