<script setup>
import { ref } from "vue";

const name = ref("Dave");
</script>

<template>
  <section>
    <p>{{ $t("message") }} - {{ name }}</p>
  </section>
</template>
