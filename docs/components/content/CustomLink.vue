<script setup lang="ts">
interface Props {
  to: string
  icon?: string
  title: string
  description: string
}

defineProps<{
  items: Props[]
}>()
</script>

<template>
  <div class="grid sm:grid-cols-2 gap-x-4">
    <NuxtLink
      v-for="(item, index) in items"
      :key="index"
      :to="item.to"
      class="block my-2 px-6 py-8 border not-prose rounded-lg bg-gray-100 dark:bg-black/30 border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 group hover:border-primary-500 dark:hover:border-primary-400 transition duration-200 ease-in-out"
    >
      <div v-if="item.icon" class="inline-flex items-center">
        <UIcon :name="item.icon" class="w-6 h-6 text-primary-500 dark:text-primary-400" />
      </div>

      <p
        class="text-gray-900 dark:text-gray-50 font-medium text-base"
        :class="{
          'mt-4': item.icon,
        }"
      >
        {{ item.title }}
      </p>

      <p class="mt-1 font-normal text-gray-500 dark:text-gray-400">
        {{ item.description }}
      </p>
    </NuxtLink>
  </div>
</template>
