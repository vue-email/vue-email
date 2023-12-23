<script setup lang="ts">
import { EHead, EText } from 'vue-email'
import BaseEmail from './BaseEmail.vue'
</script>

<template>
  <BaseEmail>
    <EText class="text-center text-primary">
      MyEmail Component
    </EText>
    <button class="btn">
      test
    </button>
  </BaseEmail>
</template>
