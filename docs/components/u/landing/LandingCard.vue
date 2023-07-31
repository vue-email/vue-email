<script setup lang="ts">
import { useMouseInElement } from '@vueuse/core'

defineProps<{
  title: string
  description?: string
  to?: string
  icon?: string
}>()
const card = ref<HTMLDivElement>()
const { elementX, elementY } = useMouseInElement(card)
</script>

<template>
  <UCard
    ref="card"
    :style="{
      '--x': `${elementX}px`,
      '--y': `${elementY}px`,
    }"
    class="border-gradient group relative before:blur-xl before:absolute before:-inset-px before:h-[calc(100%+2px)] before:w-[calc(100%+2px)] before:rounded-xl flex flex-col justify-center"
  >
    <NuxtLink v-if="to" :to="to" class="focus:outline-none" tabindex="-1">
      <span class="absolute inset-0" aria-hidden="true" />
    </NuxtLink>

    <div v-if="icon" class="relative rounded-lg flex items-center justify-center mb-6 w-10 h-10 bg-primary-500 dark:bg-primary-400 flex-shrink-0">
      <UIcon :name="icon" class="w-6 h-6 flex-shrink-0 text-white" />
    </div>

    <p class="mt-5 text-2xl font-medium text-white">
      <slot name="title">
        {{ title }}
      </slot>
    </p>

    <div v-if="description || $slots.description" class="mt-3 text-sm font-light text-white/60">
      <slot name="description">
        {{ description }}
      </slot>
    </div>

    <slot />
  </UCard>
</template>

<style>
.border-gradient::before {
  background: radial-gradient(350px circle at var(--x) var(--y), #663dc770 0%, transparent 100%);
}
</style>
