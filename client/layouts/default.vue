<template>
  <div
    class="w-full min-h-screen bg-dark-6 text-light-9 grid grid-cols-[15rem_1fr] font-sans overflow-hidden"
  >
    <aside class="min-h-full bg-dark-8 border-r border-r-dark px-6">
      <header class="h-15 flex items-center mb-8 gap-2 mt-2">
        <img class="w-6" src="/vue.svg" alt="vue icon" />
        <h3 class="font-bold text-lg">vue email</h3>
      </header>
      <nav class="flex flex-col gap-4">
        <div>
          <button class="flex items-center gap-2" @click="isOpen = !isOpen">
            <ph-folder weight="light" size="20" />
            All templates
            <ph-caret-down
              class="transition-transform transform"
              :class="[isOpen ? 'rotate-0' : 'rotate-180']"
              weight="light"
              size="16"
              v-if="navItems && navItems.length > 0"
            />
          </button>
          <transition name="item">
            <div class="relative mt-3" v-if="isOpen">
              <div class="absolute left-2.5 w-px h-full bg-slate-6" />
              <div class="py-2 flex flex-col truncate">
                <nuxt-link v-for="item in navItems" :key="item" :to="`/preview/${item}`">
                  <span
                    class="text-[14px] flex items-center font-medium gap-2 w-full pl-4 h-8 rounded-md relative transition ease-in-out duration-200"
                    :class="{
                      'text-green-3': title === item,
                      'text-slate-1 hover:text-slate-3': title !== item,
                    }"
                  >
                    <span v-if="title === item">
                      <div class="bg-green-4 w-px absolute top-1 left-2.5 h-6" />
                    </span>
                    <ph-file class="flex-shrink-0 absolute" size="20" weight="thin" />
                    <span class="absolute left-10 truncate">{{ item }}</span>
                  </span>
                </nuxt-link>
              </div>
            </div>
          </transition>
        </div>
      </nav>
    </aside>
    <div>
      <main class="bg-dark min-h-screen">
        <slot />
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PhFolder, PhFile, PhCaretDown } from '@phosphor-icons/vue';
const { data } = await useFetch('/api/emails');

const route = useRoute();
const navItems = computed(() => data.value?.emails ?? '');
const title = computed(() => route.params?.slug ?? '');
const isOpen = ref(true);
</script>

<style scoped>
.item-enter-active,
.item-leave-active {
  transition: opacity 350ms;
}
.item-enter,
.item-leave-to {
  opacity: 0;
}
.item-leave,
.item-enter-to {
  opacity: 1;
}
</style>
