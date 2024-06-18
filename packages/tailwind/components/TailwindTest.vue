<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'
import Test from './Test.vue'
import { Html } from '@vue-email/html'
import { Tailwind } from '../src/index'
import { Body } from '@vue-email/body'
import { Text } from '@vue-email/text'
import { Head } from '@vue-email/head'

interface Props {
  username?: string
  inviteFromIp?: string
  inviteFromLocation?: string
}

withDefaults(defineProps<Props>(), {
  username: 'John Doe',
  inviteFromIp: '172.0.0.1',
  inviteFromLocation: 'San Francisco, CA',
})
</script>

<template>
  <Tailwind :config="{
  theme: {
    extend: {
      colors: {
        'primary': '#fcba03',
      }
    }
  },
  }">
    <Html>
      <Head />
      <Body class="bg-white my-auto mx-auto font-sans">
       <Text class="text-primary text-[14px] leading-[24px]">
            Hello {{ username }},
          </Text>
          <Test :username="username" :inviteFromIp="inviteFromIp" :inviteFromLocation="inviteFromLocation" />
      </Body>
    </Html>
  </Tailwind>
</template>
