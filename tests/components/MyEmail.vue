<script setup lang="ts">
import { ELink, EText } from '../../src/components'
import BaseEmail from './BaseEmail.vue'
</script>

<template>
  <BaseEmail>
    <EText class="text-accent text-center myemail-class">
      MyEmail Component
    </EText>
    <ELink href="https://vercel.com/teams/invite/foo?test=123&test2=456" class="text-blue-600 no-underline">
      https://vercel.com/teams/invite/foo?test=123&test2=456
    </ELink>
  </BaseEmail>
</template>
