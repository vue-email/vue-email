<script lang="ts" setup>
import { copyTextToClipboard } from '@/util/copy-text-to-clipboard'

defineEmits(['setlang'])

const toast = useToast()
const { template } = useEmail()

function handleDownload() {
  const value = props.markups.filter((markup) => markup.language === props.activeLang)[0]
  const file = new File([value.content], `email.${value.language}`)
  const url = URL.createObjectURL(file)

  const a = document.createElement('a')

  a.href = url
  a.download = file.name
  document.body.appendChild(a)
  a.click()
  toast.add({
    title: 'Downloaded',
    description: 'Check your downloads folder.',
    icon: 'i-ph-download-simple-bold',
  })
}

const languageMap = {
  html: 'HTML',
  txt: 'Plain Text',
}

async function handleClipboard() {
  const value = props.markups.filter((markup) => markup.language === props.activeLang)[0]

  await copyTextToClipboard(value.content)
  toast.add({
    title: 'Copied to clipboard',
    description: 'You can now paste it anywhere you want.',
    icon: 'i-ph-copy-bold',
  })
}

const items = [
  {
    key: 'html',
    label: 'HTML',
    icon: 'i-ph-file-html-duotone',
    code: template.value.html,
  },
  {
    key: 'txt',
    label: 'Plain Text',
    icon: 'i-ph-text-t-duotone',
    code: template.value.txt,
  },
]
</script>

<template>
  <UTabs :items="items">
    <template #default="{ item, index, selected }">
      <div class="flex items-center gap-2 relative truncate">
        <UIcon :name="item.icon" class="w-7 h-7 flex-shrink-0" />

        <span class="truncate">{{ item.label }}</span>

        <span v-if="selected" class="absolute -right-4 w-2 h-2 rounded-full bg-primary-500 dark:bg-primary-400" />
      </div>
    </template>

    <template #item="{ item }">
      <div class="w-full" v-html="highlight(item.code, item.key)" />
    </template>
  </UTabs>
</template>

<style>
.shiki {
  width: 100%;
  height: 90vh;

  font-size: 16px;
  outline: none;
  border: none;
  overflow: auto;
  white-space: break-spaces;
}
</style>
