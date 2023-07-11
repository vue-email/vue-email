<script lang="ts">
export default { name: 'ELink' }
</script>
<template>
  <a
    data-id="__vue-email-link"
    style="color: #067df7; text-decoration: none"
    :href="href"
    target="_blank"
  >
    <slot></slot>
  </a>
</template>

<script lang="ts" setup>
defineProps({
  href: {
    type: String,
    required: true,
  },
})
</script>
