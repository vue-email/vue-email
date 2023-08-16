<script setup lang="ts">
const { emails } = useEmail()

const emailsNumber = computed(() => (emails.value ? `${emails.value.length} email${emails.value.length > 1 ? 's' : ''}` : '0 email'))

const { toggleCommandPallet } = useTool()
</script>

<template>
  <main class="h-screen flex">
    <UCard
      class="w-full"
      :ui="{
        base: '',
        ring: '',
        divide: 'divide-y divide-gray-200 dark:divide-gray-700',
        header: { padding: 'px-4 py-5' },
        body: { padding: '', base: 'divide-y divide-gray-200 dark:divide-gray-700' },
        footer: { padding: 'p-4' },
      }"
    >
      <template #header>
        <div class="flex items-center justify-between gap-3 py-3">
          <h2 class="font-semibold text-xl text-gray-900 dark:text-white leading-tight">Vue Email</h2>

          <HeaderButtons />
        </div>
      </template>

      Body

      <template #footer />
    </UCard>

    <CommandPalette />
  </main>
</template>
