<script setup lang="ts">
const { isSettingsOpen, settings } = useTool()
</script>

<template>
  <UModal v-model="isSettingsOpen">
    <div class="p-6 flex flex-col gap-y-7">
      <div class="flex justify-between items-center">
        <div class="flex flex-col content-center text-sm">
          <p class="block font-medium text-gray-700 dark:text-gray-200">Horizontal Split</p>
          <p class="text-gray-500 dark:text-gray-400 text-sm">Split the email preview and code editor horizontally</p>
        </div>
        <UToggle v-model="settings.horizontalSplit" />
      </div>
      <hr class="border-gray-700" />
      <UFormGroup class="" size="sm" label="Sender Email" description="The email address that will be used to send the test email">
        <UInput v-model="settings.email" placeholder="you@example.com" icon="i-heroicons-envelope"
      /></UFormGroup>
    </div>
  </UModal>
</template>

<style scoped></style>
