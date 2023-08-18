<script setup lang="ts">
const { isSettingsOpen, settings } = useTool()
</script>

<template>
  <UModal v-model="isSettingsOpen">
    <div class="p-4 flex flex-col">
      <div class="flex justify-between items-center">
        <div class="flex flex-col content-center text-sm">
          <p class="block font-medium text-gray-700 dark:text-gray-200">Horizontal Split</p>
          <p class="text-gray-500 dark:text-gray-400 text-sm">Split the email preview and code editor horizontally</p>
        </div>
        <UToggle v-model="settings.horizontalSplit" />
      </div>
    </div>
  </UModal>
</template>

<style scoped></style>
