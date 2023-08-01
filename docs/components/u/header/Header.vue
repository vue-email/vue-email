<script setup lang="ts">
import { Dialog, DialogPanel, TransitionRoot } from '@headlessui/vue'
import type { HeaderLink } from 'types'

defineProps<{
  links?: HeaderLink[]
}>()

const route = useRoute()
const appConfig = useAppConfig()

const ui = computed(() => appConfig.uiKit.header)

const isDialogOpen = ref(false)

watch(
  () => route.fullPath,
  () => {
    isDialogOpen.value = false
  },
)
</script>

<template>
  <header :class="[ui.position, ui.background, ui.border]">
    <UContainer>
      <div class="flex items-center justify-between gap-3" :class="[ui.height]">
        <div class="lg:flex-1 flex items-center gap-1.5">
          <slot name="left">
            <NuxtLink to="/getting-started" class="flex-shrink-0 font-bold text-xl text-gray-900 dark:text-white flex items-end gap-1.5">
              <slot name="logo"> VueEmail </slot>
            </NuxtLink>
          </slot>
        </div>

        <slot name="center" />

        <UHeaderLinks :links="links" class="hidden lg:flex" />

        <div class="flex items-center justify-end lg:flex-1 gap-1.5">
          <slot name="right" />

          <UButton
            color="gray"
            variant="ghost"
            class="lg:hidden"
            :icon="isDialogOpen ? 'i-heroicons-x-mark-20-solid' : 'i-heroicons-bars-3'"
            @click="isDialogOpen = !isDialogOpen"
          />
        </div>
      </div>
    </UContainer>

    <TransitionRoot :show="isDialogOpen" as="template">
      <Dialog as="div" @close="isDialogOpen = false">
        <DialogPanel class="fixed inset-0 z-50 overflow-y-auto bg-background lg:hidden">
          <div class="px-4 sm:px-6" :class="[ui.background, ui.border, ui.position]">
            <div class="flex items-center justify-between gap-3" :class="[ui.height]">
              <div class="lg:flex-1 flex items-center gap-1.5">
                <slot name="left">
                  <NuxtLink to="/getting-started" class="flex-shrink-0 font-bold text-xl text-gray-900 dark:text-white flex items-end gap-1.5">
                    <slot name="logo"> VueEmail </slot>
                  </NuxtLink>
                </slot>
              </div>

              <slot name="center" />

              <div class="flex items-center justify-end lg:flex-1 gap-1.5">
                <slot name="right" />

                <UButton
                  color="gray"
                  variant="ghost"
                  class="lg:hidden"
                  :icon="isDialogOpen ? 'i-heroicons-x-mark-20-solid' : 'i-heroicons-bars-3'"
                  @click="isDialogOpen = !isDialogOpen"
                />
              </div>
            </div>
          </div>
          <div class="px-4 sm:px-6 pt-3 pb-6">
            <UAsideAnchors :links="links" />

            <slot name="links" />
          </div>
        </DialogPanel>
      </Dialog>
    </TransitionRoot>
  </header>
</template>
