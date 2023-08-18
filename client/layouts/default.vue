<script setup lang="ts">
const { getEmails } = useEmail()

await getEmails()
</script>

<template>
  <UCard
    class="w-full"
    :ui="{
      base: '',
      ring: '',
      divide: 'divide-y divide-gray-200 dark:divide-gray-700',
      body: { padding: '', base: 'divide-y divide-gray-200 dark:divide-gray-700' },
      footer: { padding: 'p-4' },
    }"
  >
    <template #header>
      <TopNav />
    </template>

    <slot />

    <!-- <template #footer>
        <div class="flex items-center justify-center">
          <UBadge color="primary" variant="subtle"> v{{ version }} </UBadge>
        </div>
      </template> -->
  </UCard>

  <CommandPalette />
  <UNotifications />
  <Settings />
</template>

<style></style>
