<script setup lang="ts">
const { isSettingsOpen, reloadTemplate } = useTool()
const route = useRoute()

const isEmailRoute = computed(() => route.name === 'email-file')
</script>

<template>
  <div class="flex items-center justify-between gap-2">
    <SearchButton />
    <UTooltip text="Vue Email Settings">
      <UButton icon="i-ph-gear-duotone" size="sm" color="gray" variant="solid" @click="isSettingsOpen = true" />
    </UTooltip>
    <SendEmail v-if="isEmailRoute" />
    <UTooltip v-if="isEmailRoute" text="Reload template">
      <UButton icon="i-ph-arrow-counter-clockwise-bold" size="sm" color="gray" variant="solid" @click="reloadTemplate = true" />
    </UTooltip>
    <UTooltip text="Read Documentation">
      <UButton icon="i-ph-read-cv-logo-bold" size="sm" color="gray" variant="solid" label="Docs" to="https://www.vuemail.net/" target="_blank" />
    </UTooltip>
    <UTooltip text="View Github Repo">
      <UButton icon="i-simple-icons-github" size="sm" color="gray" variant="solid" to="https://github.com/Dave136/vue-email" target="_blank" />
    </UTooltip>
  </div>
</template>
