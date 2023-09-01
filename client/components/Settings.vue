<script setup lang="ts">
const { isSettingsOpen, email, horizontalSplit, previewMode, previewModes, editorCode, editorCodes } = useTool()
</script>

<template>
  <UModal v-model="isSettingsOpen">
    <div class="p-6 flex flex-col gap-y-7">
      <div class="flex justify-between items-center">
        <div class="flex flex-col content-center text-sm">
          <p class="block font-medium text-gray-700 dark:text-gray-200">Horizontal Split</p>
          <p class="text-gray-500 dark:text-gray-400 text-sm">Split the email preview and code editor horizontally</p>
        </div>
        <UToggle v-model="horizontalSplit" />
      </div>
      <div class="flex justify-between items-center">
        <div class="flex flex-col content-center text-sm">
          <p class="block font-medium text-gray-700 dark:text-gray-200">Preview Mode</p>
          <p class="text-gray-500 dark:text-gray-400 text-sm">Choose between the preview modes</p>
        </div>
        <USelectMenu v-model="previewMode" class="min-w-[100px]" :options="previewModes">
          <template v-if="previewMode" #label>
            <UIcon v-if="previewMode.icon" :name="previewMode.icon" class="w-4 h-4" />
            {{ previewMode.label }}
          </template>
        </USelectMenu>
      </div>
      <div class="flex justify-between items-center">
        <div class="flex flex-col content-center text-sm">
          <p class="block font-medium text-gray-700 dark:text-gray-200">Editor Language</p>
          <p class="text-gray-500 dark:text-gray-400 text-sm">Choose which code language to display in the editor</p>
        </div>
        <USelectMenu v-model="editorCode" class="min-w-[100px]" :options="editorCodes">
          <template v-if="editorCode" #label>
            <UIcon v-if="editorCode.icon" :name="editorCode.icon" class="w-4 h-4" />
            {{ editorCode.label }}
          </template>
        </USelectMenu>
      </div>
      <hr class="border-gray-700" />
      <UFormGroup class="" size="sm" label="Email" description="The email address that will be used to send the test emails">
        <UInput v-model="email" class="mt-2" placeholder="you@example.com" icon="i-heroicons-envelope"
      /></UFormGroup>
    </div>
  </UModal>
</template>

<style scoped></style>
