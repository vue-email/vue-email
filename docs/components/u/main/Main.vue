<script setup lang="ts">
const appConfig = useAppConfig()

const ui = computed(() => appConfig.uiKit.main)
</script>

<template>
  <main :class="[ui.height]">
    <slot />
  </main>
</template>
