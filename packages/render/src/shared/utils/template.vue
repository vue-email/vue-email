<template>
  <h1>Welcome, {{ firstName }}!</h1>
    <img alt="test" src="img/test.png" />
    <!-- TODO: END -->
    <p>Thanks for trying our product. We're thrilled to have you on board!</p>
</template>

<script setup lang="ts">

defineProps<{
  firstName: string
}>()
</script>
