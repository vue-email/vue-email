<script lang="ts" setup>
import { camelCase } from 'scule'
import { copyTextToClipboard } from '@/util/copy-text-to-clipboard'

defineEmits(['setlang'])

const toast = useToast()
const { editorCode } = useTool()
const { template, email } = useEmail()

function handleDownload(lang: 'html' | 'txt' | 'vue') {
  const content = template.value[lang]
  const file = new File([content], `${camelCase(email.value.label)}.${lang}`)
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

async function handleClipboard(lang: 'html' | 'txt' | 'vue') {
  await copyTextToClipboard(template.value[lang])
  toast.add({
    title: 'Copied to clipboard',
    description: 'You can now paste it anywhere you want.',
    icon: 'i-ph-copy-bold',
  })
}

const items = computed(() => {
  let arr = []

  if (editorCode.value.id === 'all') {
    arr = [
      {
        key: 'vue',
        label: 'Vue',
        icon: 'i-ph-file-vue-duotone',
        code: template.value.vue,
      },
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
  } else if (editorCode.value.id === 'html') {
    arr.push({
      key: 'html',
      label: 'HTML',
      icon: 'i-ph-file-html-duotone',
      code: template.value.html,
    })
  } else if (editorCode.value.id === 'txt') {
    arr.push({
      key: 'txt',
      label: 'Plain Text',
      icon: 'i-ph-text-t-duotone',
      code: template.value.txt,
    })
  } else if (editorCode.value.id === 'vue') {
    arr.push({
      key: 'vue',
      label: 'Vue',
      icon: 'i-ph-file-vue-duotone',
      code: template.value.vue,
    })
  }

  return arr
})

const tab = ref('html')
</script>

<template>
  <UTabs v-model="tab" :items="items">
    <template #default="{ item, selected }">
      <div class="flex items-center gap-2 relative truncate">
        <UIcon :name="item.icon" class="w-7 h-7 flex-shrink-0" />

        <span class="truncate">{{ item.label }}</span>
        <template v-if="selected">
          <UTooltip text="Copy to clipboard">
            <UButton class="ml-6" icon="i-ph-copy-duotone" size="xs" square color="gray" variant="solid" @click="handleClipboard(item.key)" />
          </UTooltip>
          <UTooltip :text="`Download .${item.key} file`">
            <UButton icon="i-ph-download-simple-duotone" size="xs" square color="gray" variant="solid" @click="handleDownload(item.key)" />
          </UTooltip>
        </template>

        <span v-if="selected" class="absolute -right-4 w-2 h-2 rounded-full bg-primary-500 dark:bg-primary-400" />
      </div>
    </template>

    <template #item="{ item }">
      <div class="w-full h-full" v-html="highlight(item.code, item.key)" />
    </template>
  </UTabs>
</template>

<style>
/* TODO: fix content height issues */
.shiki {
  width: 100%;
  height: 90vh;
  padding-bottom: 100px;
  padding-inline: 20px;
  font-size: 16px;
  outline: none;
  border: none;
  overflow: auto;
  white-space: break-spaces;
}
</style>
