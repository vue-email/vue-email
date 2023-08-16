<script setup lang="ts">
const router = useRouter()

const { emails } = useEmail()
const { isCommandPalletOpen } = useTool()

//  TODO: Add extra actions like sending test email and copy to clipboard
// const actions = [
//   { id: 'new-file', label: 'Add new email', icon: 'i-heroicons-document-plus', click: () => alert('New file'), shortcuts: ['⌘', 'N'] },
//   { id: 'new-folder', label: 'Add new folder', icon: 'i-heroicons-folder-plus', click: () => alert('New folder'), shortcuts: ['⌘', 'F'] },
// ]

const selected = ref([])
</script>

<template>
  <UModal v-model="isCommandPalletOpen">
    <UCommandPalette v-model="selected" :groups="[{ key: 'emails', commands: emails }]" :fuse="{ resultLimit: 6, fuseOptions: { threshold: 0.1 } }" />
  </UModal>
</template>
