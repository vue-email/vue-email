<template>
  <div
    class="border-slate-6 relative w-full items-center whitespace-pre rounded-md border text-sm backdrop-blur-md"
    style="line-height: 130%"
  >
    <div class="h-9 border-b border-slate-6">
      <div class="flex">
        <button
          v-for="markup in markups"
          :key="markup.language"
          class="relative py-[8px] px-4 text-sm font-medium font-sans transition ease-in-out duration-200 hover:text-slate-12"
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
          />

          {{ languageMap[markup.language] }}
        </button>
      </div>
      <div>
        <button class="absolute top-3 right-2 hidden md:block" @click="handleClipboad">
          <ph-check weight="light" v-if="isCopied" />
          <ph-clipboard weight="light" v-else />
        </button>
        <button class="text-gray-11 absolute top-3 right-8 hidden md:block" @click="handleDownload">
          <ph-download weight="light" />
        </button>
      </div>
    </div>
    <template v-for="markup in markups" :key="markup.language">
      <div :class="[activeLang !== markup.language && 'hidden']">
        <client-only>
          <code-block
            :code="markup.content"
            lang="html"
            highlightjs
            :copy-button="false"
            theme="vs2015"
            max-height="45rem"
          />
        </client-only>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { PhCheck, PhClipboard, PhDownload } from '@phosphor-icons/vue';

interface MarkupProps {
  language: string;
  content: string;
}

interface Props {
  markups: MarkupProps[];
  activeLang: string;
}

interface Emits {
  (e: 'setlang', lang: string): void;
}

const props = defineProps<Props>();
defineEmits<Emits>();

const isCopied = ref(false);

const handleDownload = () => {
  const value = props.markups.filter((markup) => markup.language === props.activeLang)[0];
  const file = new File([value.content], `email.${value.language}`);
  const url = URL.createObjectURL(file);

  const a = document.createElement('a');
  a.href = url;
  a.download = file.name;
  document.body.appendChild(a);
  a.click();
};

const languageMap = {
  vue: 'Vue',
  markup: 'HTML',
  markdown: 'Plain Text',
};

const handleClipboad = async () => {
  const value = props.markups.filter((markup) => markup.language === props.activeLang)[0];
  isCopied.value = true;
  await copyTextToClipboard(value.content);
  setTimeout(() => (isCopied.value = false), 3000);
};
</script>

<style scoped>
:deep(.v-code-block) {
  @apply !mb-0;
}
</style>
