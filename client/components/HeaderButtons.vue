<script setup lang="ts">
const ui = { rounded: 'rounded-full' }
</script>

<template>
  <div class="flex items-center justify-between gap-2">
    <SearchButton />
    <UButton icon="i-ph-read-cv-logo-bold" size="sm" color="gray" variant="solid" label="Docs" to="https://www.vuemail.net/" target="_blank" />
    <UButton icon="i-ph-github-logo-bold" :ui="ui" size="sm" color="gray" variant="solid" to="https://github.com/Dave136/vue-email" target="_blank" />
    <UButton icon="i-ph-discord-logo-bold" :ui="ui" size="sm" color="blue" variant="solid" to="https://discord.gg/Z2RW7qvS3Q" target="_blank" />
  </div>
</template>
