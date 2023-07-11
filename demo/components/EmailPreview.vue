<script lang="ts" setup>
import { ActiveView, ActiveLang, Template } from '@/types/email'

const props = defineProps({
  slug: {
    type: String,
    required: true,
  },
  template: {
    type: Object as PropType<Template>,
    required: true,
  },
})

const router = useRouter()
const route = useRoute()
const query = route.query as {
  view?: ActiveView;
  lang?: ActiveLang;
}

const activeView = ref<ActiveView>('desktop')
const activeLang = ref<ActiveLang>('html')
const iframeUpdate = ref(0)

function handleView(view: ActiveView) {
  activeView.value = view
  router.push(`${route.path}?view=${view}`)
  if (iframeUpdate.value >= 100) iframeUpdate.value = 0
  iframeUpdate.value++
}

async function updateIframe() {
  await useEmail().getEmail(props.slug)

  if (iframeUpdate.value >= 100) iframeUpdate.value = 0
  iframeUpdate.value++
}

const setlang = (lang: ActiveLang) => {
  activeLang.value = lang
  router.push(`${route.path}?view=source&lang=${lang}`)
}

watchEffect(() => {
  if (
    query.view === 'source' ||
    query.view === 'desktop' ||
    query.view === 'mobile'
  )
    activeView.value = query.view

  if (query.lang) {
    if (['html', 'md'].includes(query.lang)) activeLang.value = query.lang
  }
})
</script>

<template>
  <section>
    <header
      class="relative h-[70px] w-full bg-dark-8 flex justify-center items-center space-x-3"
    >
      <UButton
        icon="i-heroicons-device-phone-mobile"
        size="lg"
        color="gray"
        variant="solid"
        :trailing="false"
        @click="handleView('mobile')"
      />
      <UButton
        icon="i-heroicons-computer-desktop"
        size="lg"
        color="gray"
        variant="solid"
        :trailing="false"
        @click="handleView('desktop')"
      />

      <UButton
        icon="i-heroicons-code-bracket"
        size="lg"
        color="gray"
        variant="solid"
        label="Source"
        :trailing="true"
        @click="activeView === 'source' ? null : handleView('source')"
      />
      <UButton
        icon="i-heroicons-arrow-path"
        size="lg"
        color="green"
        variant="solid"
        class="absolute right-3"
        @click="updateIframe"
      />
    </header>
    <div
      v-if="activeView !== 'source'"
      class="flex justify-center items-center"
    >
      <iframe
        :key="iframeUpdate"
        :srcdoc="template.html"
        class="h-[calc(100vh_-_70px)]"
        :class="{
          'w-full': activeView === 'desktop',
          'w-[425px]': activeView === 'mobile',
        }"
        frameborder="0"
        :width="activeView === 'desktop' ? '100%' : 425"
      ></iframe>
    </div>
    <div v-else class="flex gap-6 mx-auto p-6 max-w-6xl">
      <CodeContainer
        :active-lang="activeLang"
        :markups="[
          {
            language: 'html',
            content: template.html,
          },
          {
            language: 'md',
            content: template.plainText,
          },
        ]"
        @setlang="setlang"
      />
    </div>
  </section>
</template>
