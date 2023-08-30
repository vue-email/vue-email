<script setup lang="ts">
import type { Email } from '~/types/email'

const router = useRouter()

const { emails } = useEmail()
const { isCommandPalletOpen } = useTool()
const ui = {
  wrapper: 'flex flex-col flex-1 min-h-0 divide-y divide-gray-200 dark:divide-gray-700 bg-gray-50 dark:bg-gray-800',
  container: 'relative flex-1 overflow-y-auto divide-y divide-gray-200 dark:divide-gray-700 scroll-py-2',
  input: {
    base: 'w-full h-14 px-4 placeholder-gray-400 dark:placeholder-gray-500 bg-transparent border-0 text-gray-900 dark:text-white focus:ring-0 focus:outline-none',
  },
  group: {
    label: 'px-2 my-2 text-xs font-semibold text-gray-500 dark:text-gray-400',
    command: {
      base: 'flex justify-between select-none cursor-default items-center rounded-md px-2 py-2 gap-2 relative',
      active: 'bg-gray-200 dark:bg-gray-700/50 text-gray-900 dark:text-white',
      container: 'flex items-center gap-3 min-w-0',
      icon: {
        base: 'flex-shrink-0 w-5 h-5',
        active: 'text-gray-900 dark:text-white',
        inactive: 'text-gray-400 dark:text-gray-500',
      },
      avatar: {
        size: '2xs',
      },
    },
  },
}
//  TODO: Add extra actions like sending test email and copy to clipboard
// const actions = [
//   { id: 'new-file', label: 'Add new email', icon: 'i-heroicons-document-plus', click: () => alert('New file'), shortcuts: ['⌘', 'N'] },
//   { id: 'new-folder', label: 'Add new folder', icon: 'i-heroicons-folder-plus', click: () => alert('New folder'), shortcuts: ['⌘', 'F'] },
// ]

function onSelect(option: Email) {
  if (option) {
    router.push(`/email/${option.filename}`)
    isCommandPalletOpen.value = false
  }
}
</script>

<template>
  <UModal v-model="isCommandPalletOpen">
    <UCommandPalette :ui="ui" :groups="[{ key: 'emails', commands: emails }]" by="filename" placeholder="Search for email templates..." @update:model-value="onSelect" />
  </UModal>
</template>
