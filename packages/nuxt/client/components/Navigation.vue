<script setup lang="ts">
defineProps({
  links: {
    type: Array,
    required: true,
  },
  ui: {
    type: Object,
    required: false,
    default: () => ({
      wrapper: 'space-y-2',
      base: 'group flex items-center gap-x-1 border-s -ms-px lg:leading-6',
      padding: 'ps-2',
      rounded: '',
      font: '',
      ring: '',
      active: 'text-primary-400 border-transparent font-semibold',
      inactive: 'border-transparent text-gray-400 hover:text-gray-300',
    }),
  },
})
</script>

<template>
  <UVerticalNavigation
    :links="links"
    :ui="{
      wrapper: 'border-s border-gray-800 space-y-2 ml-3',
      base: 'group flex items-center gap-x-1 border-s -ms-px lg:leading-6',
      padding: 'ps-4',
      rounded: '',
      font: '',
      ring: '',
      active: 'text-primary-400 border-current font-semibold',
      inactive: 'border-transparent hover:border-gray-500 text-gray-400 hover:text-gray-300',
    }"
  >
    <template #default="{ link }">
      <div class="relative text-left w-full">
        <div
          class="flex items-center"
          :class="{
            'mb-2': link.children && link.children.length,
          }"
        >
          <UIcon v-if="link.children" name="i-ph-folder-duotone" class="text-xl mr-2" />
          {{ link.label }}
        </div>
        <Navigation v-if="link.children" :ui="ui" :links="link.children" />
      </div>
    </template>
  </UVerticalNavigation>
</template>
