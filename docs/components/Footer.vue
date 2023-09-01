<script setup lang="ts">
const config = useRuntimeConfig().public
</script>

<template>
  <footer class="flex items-center gap-1.5 mt-12">
    <NuxtLink :to="`https://github.com/Dave136/vue-email/releases/tag/v${config.version}`" target="_blank" class="inline-flex">
      <UBadge :label="`v${config.version}`" variant="subtle" />
    </NuxtLink>

    <div class="flex-1 flex items-center justify-end gap-1.5 -my-1 lg:hidden">
      <USocialButton to="https://discord.gg/Z2RW7qvS3Q" target="_blank" icon="i-simple-icons-discord" />
      <USocialButton to="https://github.com/Dave136/vue-email" target="_blank" icon="i-simple-icons-github" />
    </div>
  </footer>
</template>
