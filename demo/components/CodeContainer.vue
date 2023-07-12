<script lang="ts" setup>
import { ActiveLang, MarkupProps } from '@/types/email'

const props = defineProps({
  markups: {
    type: Array as PropType<MarkupProps[]>,
    required: true,
  },
  activeLang: {
    type: String as PropType<ActiveLang>,
    required: true,
  },
})

defineEmits({
  setlang: (lang: ActiveLang) => true,
})

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
  vue: 'Vue',
  html: 'HTML',
  txt: 'PlanText',
}

async function handleClipboad() {
  const value = props.markups.filter(
    (markup) => markup.language === props.activeLang,
  )[0]

  await copyTextToClipboard(value.content)
  toast.add({
    title: 'Copied to clipboard',
    description: 'You can now paste it anywhere you want.',
    icon: 'i-ph-copy-bold',
  })
}
</script>

<template>
  <div
    class="border-gray-600 relative w-full items-center whitespace-pre rounded-md border text-sm"
    style="line-height: 130%"
  >
    <div class="flex justify-between items-center border-b border-gray-600">
      <div class="flex">
        <button
          v-for="markup in markups"
          :key="markup.language"
          class="relative py-[8px] px-4 text-sm font-medium font-sans transition ease-in-out duration-200 hover:text-gray-100"
          :class="[
            activeLang !== markup.language
              ? 'text-gray-500'
              : 'text-gray-100 bg-gray-600 rounded-lt-md',
          ]"
          @click="$emit('setlang', markup.language)"
        >
          <span
            v-if="activeLang === markup.language"
            class="absolute left-0 right-0 top-0 bottom-0 border-b border-b-sky-400"
          ></span>

          {{ languageMap[markup.language] }}
        </button>
      </div>
      <div class="flex gap-x-2 mr-4 relative">
        <UTooltip text="Copy to clipboard">
          <UButton
            color="white"
            size="xs"
            icon="i-ph-copy-bold"
            @click="handleClipboad"
          />
        </UTooltip>
        <UTooltip :text="`Download ${languageMap[activeLang]} Code`">
          <UButton
            color="white"
            size="xs"
            icon="i-ph-download-simple-bold"
            @click="handleDownload"
          />
        </UTooltip>
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
