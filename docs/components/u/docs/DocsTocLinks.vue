<script setup lang="ts">
import type { TocLink } from '@nuxt/content/dist/runtime/types'
import { isClient } from '@vueuse/core'

defineProps<{ links: TocLink[] }>()

const emit = defineEmits(['move'])

const route = useRoute()
const router = useRouter()
const { activeHeadings, updateHeadings } = useScrollspy()

watch(
  () => route.path,
  () => {
    setTimeout(() => {
      if (isClient) {
        updateHeadings([...document.querySelectorAll('h2'), ...document.querySelectorAll('h3')])
      }
    }, 300)
  },
  { immediate: true },
)

function scrollToHeading(id: string) {
  router.push(`#${id}`)
  emit('move', id)
}
</script>

<template>
  <ul class="space-y-2">
    <li v-for="link in links" :key="link.text" :class="{ 'ml-3': link.depth === 3 }" class="space-y-2">
      <a
        :href="link.id ? `#${link.id}` : null"
        class="block text-sm truncate"
        :class="[activeHeadings.includes(link.id) ? 'text-primary-500 dark:text-primary-400' : 'hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300']"
        @click.prevent="scrollToHeading(link.id)"
      >
        {{ link.text }}
      </a>

      <UDocsTocLinks v-if="link.children" :links="link.children" />
    </li>
  </ul>
</template>
