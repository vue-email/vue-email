<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    name: String,
    required: true,
  }
})
</script>

<template>
  <h1>Hi! My name is {{ name }}</h1>
</template>
