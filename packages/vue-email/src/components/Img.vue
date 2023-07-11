<script lang="ts">
export default { name: 'EImg' }
</script>
<template>
  <img
    data-id="__vue-email-img"
    style="display: block; outline: none; border: none; text-decoration: none"
    :src="src"
  />
</template>

<script lang="ts" setup>
defineProps({
  src: {
    type: String,
    required: true,
  },
})
</script>
