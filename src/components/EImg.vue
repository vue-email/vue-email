<script setup lang="ts">
defineProps({
  src: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <img data-id="__vue-email-img" style="display: block; outline: none; border: none; text-decoration: none" :src="src" />
</template>
