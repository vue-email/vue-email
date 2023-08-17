<script setup lang="ts">
const { email } = useEmail()
</script>

<template>
  <div class="flex items-center justify-between gap-2">
    <SendEmail v-if="email" />
    <SearchButton />
    <UTooltip text="Read Documentation">
      <UButton icon="i-ph-read-cv-logo-bold" size="sm" color="gray" variant="solid" label="Docs" to="https://www.vuemail.net/" target="_blank" />
    </UTooltip>
    <UTooltip text="View Github Repo">
      <UButton icon="i-simple-icons-github" size="sm" color="gray" variant="solid" to="https://github.com/Dave136/vue-email" target="_blank" />
    </UTooltip>
    <UTooltip text="Join Our Discord">
      <UButton icon="i-simple-icons-discord" size="sm" color="blue" variant="solid" to="https://discord.gg/Z2RW7qvS3Q" target="_blank" />
    </UTooltip>
  </div>
</template>
