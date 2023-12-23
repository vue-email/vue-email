<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRender } from 'vue-email'
import MyEmail from './components/MyEmail.vue'
import Test from './components/Test.vue'

const email = ref('')
onMounted(async () => {
  await useRender(Test, { props: { title: 'Some title' } }, {
    pretty: true,
  }).then((res) => {
    email.value = res.html
  })
})
</script>

<template>
  <iframe :srcdoc="email" />
</template>

<style scoped>
#app, body, html, iframe {
  width: 100%;
  height: 100vh;
}
</style>
