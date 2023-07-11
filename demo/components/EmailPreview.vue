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
const { getEmail, sendTestEmail, sending } = useEmail()
const query = route.query as {
  view?: ActiveView;
  lang?: ActiveLang;
}

const activeView = ref<ActiveView>('desktop')
const activeLang = ref<ActiveLang>('html')
const iframeUpdate = ref(0)
const emailTo = ref('')
const emailSubject = ref('Testing React Email')

function handleView(view: ActiveView) {
  activeView.value = view
  router.push(`${route.path}?view=${view}`)
  if (iframeUpdate.value >= 100) iframeUpdate.value = 0
  iframeUpdate.value++
}

async function updateIframe() {
  await getEmail(props.slug)

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
      class="h-[70px] w-full bg-dark-8 flex justify-between items-center space-x-3 px-3"
    >
      <div class="items-center flex justify-center space-x-3">
        <UTooltip text="Change View to Mobile">
          <UButton
            icon="i-heroicons-device-phone-mobile"
            size="sm"
            color="gray"
            variant="solid"
            :trailing="false"
            @click="handleView('mobile')"
          />
        </UTooltip>
        <UTooltip text="Change View to Desktop">
          <UButton
            icon="i-heroicons-computer-desktop"
            size="sm"
            color="gray"
            variant="solid"
            :trailing="false"
            @click="handleView('desktop')"
          />
        </UTooltip>
        <UTooltip text="Get HTML/Markdown Code">
          <UButton
            icon="i-heroicons-code-bracket"
            size="sm"
            color="gray"
            variant="solid"
            label="Source"
            class="px-4"
            :trailing="true"
            @click="activeView === 'source' ? null : handleView('source')"
          />
        </UTooltip>
        <UTooltip text="Refresh Frame">
          <UButton
            icon="i-heroicons-arrow-path"
            size="sm"
            color="green"
            variant="solid"
            @click="updateIframe"
          />
        </UTooltip>
      </div>
      <UPopover
        :ui="{
          base: 'p-4',
          width: 'w-72',
        }"
      >
        <UButton
          icon="i-heroicons-envelope"
          size="sm"
          color="gray"
          label="Send"
          variant="solid"
          :trailing="true"
          class="px-4"
        />
        <template #panel>
          <label
            for="to"
            class="text-gray-400 text-xs uppercase font-medium mb-2 block"
          >Recipient</label>
          <UInput
            id="to"
            v-model="emailTo"
            type="email"
            color="white"
            variant="outline"
            placeholder="you@example.com"
          />
          <label
            for="to"
            class="text-gray-400 text-xs uppercase font-medium mt-3 mb-2 block"
          >Subject</label>
          <UInput
            id="to"
            v-model="emailSubject"
            type="text"
            color="white"
            variant="outline"
            placeholder="My Email"
          />

          <div class="flex items-center justify-between mt-3">
            <span class="inline-block text-xs text-slate-11 font-normal">Powered by
              <a
                class="hover:text-slate-12 transition ease-in-out duration-300"
                href="https://resend.com"
                target="_blank"
                rel="noreferrer"
              >Resend</a></span>
            <UButton
              color="green"
              :disabled="
                sending &&
                  (!emailTo || !emailSubject) &&
                  (emailSubject.trim().length === 0 ||
                    emailTo.trim().length === 0)
              "
              :loading="sending"
              variant="solid"
              label="Send"
              @click="sendTestEmail(emailTo, emailSubject, template.html)"
            />
          </div>
        </template>
      </UPopover>
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
