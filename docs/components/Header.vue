<script setup lang="ts">
import type { NavItem } from '@nuxt/content/dist/runtime/types'

const { mapContentNavigation } = useElementsHelpers()

const navigation = inject<Ref<NavItem[]>>('navigation')
const config = useRuntimeConfig().public
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/getting-started" class="flex items-end gap-1.5 font-bold text-xl text-gray-900 dark:text-white">
        <Logo class="w-8 h-8" />
        <span class="hidden sm:block"><span class="sm:text-primary-500 dark:sm:text-primary-400">Vue</span>Email</span>
      </NuxtLink>
    </template>

    <template #center>
      <UDocsSearchButton class="ml-1.5 flg:w-64 xl:w-96" />
    </template>

    <template #right>
      <!-- <ColorPicker /> -->

      <NuxtLink :to="`https://github.com/Dave136/vue-email/releases/tag/v${config.version}`" target="_blank" class="inline-flex">
        <UBadge :label="`v${config.version}`" variant="subtle" />
      </NuxtLink>
      <UColorModeButton />
      <USocialButton to="https://discord.gg/Z2RW7qvS3Q" target="_blank" icon="i-simple-icons-discord" class="hidden lg:inline-flex" />
      <USocialButton to="https://github.com/Dave136/vue-email" target="_blank" icon="i-simple-icons-github" class="hidden lg:inline-flex" />
    </template>

    <template #panel>
      <!-- <BranchSelect /> -->
      <UNavigationTree :links="mapContentNavigation(navigation)" />
    </template>
  </UHeader>
</template>
