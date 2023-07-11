<script lang="ts" setup>
import { ActiveLang, MarkupProps } from '@/types/email'

const props = defineProps({
  markups: {
    type: Array as PropType<MarkupProps[]>,
    required: true,
  },
  activeLang: {
    type: String,
    required: true,
  },
})

defineEmits({
  setlang: (lang: ActiveLang) => true,
})

const isCopied = ref(false)
const toast = useToast()

function handleDownload() {
  const value = props.markups.filter(
    (markup) => markup.language === props.activeLang,
  )[0]
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
  md: 'Markdown',
}

async function handleClipboad() {
  const value = props.markups.filter(
    (markup) => markup.language === props.activeLang,
  )[0]

  isCopied.value = true
  await copyTextToClipboard(value.content)
  toast.add({
    title: 'Copied to clipboard',
    description: 'You can now paste it anywhere you want.',
    icon: 'i-ph-copy-bold',
  })
  setTimeout(() => (isCopied.value = false), 3000)
}
</script>

<template>
  <div
    class="border-slate-6 relative w-full items-center whitespace-pre rounded-md border text-sm backdrop-blur-md"
    style="line-height: 130%"
  >
    <div
      class="flex justify-between items-center i border-b border-slate-6 px-5"
    >
      <div class="flex py-[8px] gap-x-4">
        <button
          v-for="markup in markups"
          :key="markup.language"
          class="relative text-sm font-medium font-sans transition ease-in-out duration-200 hover:text-slate-12"
          :class="[
            activeLang !== markup.language
              ? 'text-slate-5'
              : 'text-slate-1 bg-dark-6 rounded-lt-md',
          ]"
          @click="$emit('setlang', markup.language)"
        >
          <span
            v-if="activeLang === markup.language"
            class="absolute left-0 right-0 top-0 bottom-0 border-b border-b-green-4"
          ></span>

          {{ languageMap[markup.language] }}
        </button>
      </div>
      <div class="text-xl flex gap-x-2">
        <button @click="handleClipboad">
          <UIcon
            v-if="isCopied"
            name="i-heroicons-check-20-solid"
            weight="light"
          />
          <UIcon v-else name="i-heroicons-clipboard-document" weight="light" />
        </button>
        <button class="text-gray-11" @click="handleDownload">
          <UIcon name="i-heroicons-document-arrow-down" weight="light" />
        </button>
      </div>
    </div>
    <template v-for="markup in markups" :key="markup.language">
      <div :class="[activeLang !== markup.language && 'hidden']">
        <client-only>
          <CodeBlock
            :code="markup.content"
            lang="html"
            highlightjs
            :copy-button="false"
            theme="tokyo-night-dark"
            max-height="45rem"
            class="text-base"
          />
        </client-only>
      </div>
    </template>
  </div>
</template>
