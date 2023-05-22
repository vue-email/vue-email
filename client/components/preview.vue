<template>
  <section>
    <header class="h-[70px] w-full bg-dark-8 flex">
      <div class="flex-1 flex items-center">
        <p class="ml-8">{{ $route.params.slug }}</p>
      </div>
      <div class="flex-1 flex justify-center items-center">
        <button
          class="px-4 border border-dark border-r-none py-2 rounded-md rounded-r-none"
          :class="activeView === 'desktop' ? 'bg-dark' : ''"
          @click="handleView('desktop')"
        >
          Desktop
        </button>
        <button
          class="px-4 border border-dark border-l-none py-2 rounded-md rounded-l-none"
          :class="activeView === 'source' ? 'bg-dark' : ''"
          @click="handleView('source')"
        >
          Source
        </button>
      </div>
      <p class="flex-1"></p>
    </header>
    <div v-if="activeView === 'desktop'">
      <iframe :srcdoc="markup" class="w-full h-[calc(100vh_-_70px)]"></iframe>
    </div>
    <div class="flex gap-6 mx-auto p-6 max-w-3xl" v-else>
      <code-container
        :active-lang="activeLang"
        :markups="[
          {
            language: 'vue',
            content: vueMarkup,
          },
          {
            language: 'markup',
            content: markup,
          },
          {
            language: 'markdown',
            content: plainText,
          },
        ]"
        @setlang="handleLang"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
interface Props {
  slug: string;
  markup: string;
  vueMarkup: string;
  plainText: string;
}

defineProps<Props>();

const router = useRouter();
const route = useRoute();
const query = route.query;

type ActiveView = 'desktop' | 'source';
type ActiveLang = 'vue' | 'markup' | 'markdown';

const activeView = ref<ActiveView>('desktop');
const activeLang = ref<ActiveLang>('vue');

const handleView = (view: ActiveView) => {
  activeView.value = view;
  router.push(`${route.path}?view=${view}`);
};

const handleLang = (lang: ActiveLang) => {
  activeLang.value = lang;
  router.push(`${route.path}?view=source&lang=${lang}`);
};

watchEffect(() => {
  if (query.view === 'source' || query.view === 'desktop') {
    activeView.value = query.view;
  }

  if (['vue', 'markup', 'markdown'].includes(query.lang)) {
    activeLang.value = query.lang;
  }
});
</script>
