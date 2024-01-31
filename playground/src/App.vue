<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ECodeBlock, ECodeInline, useRender } from 'vue-email'
import Test from './components/Test.vue'

const email = ref('')
onMounted(async () => {
  await useRender(Test, { props: { title: 'Some title' } }, {
    pretty: true,
  }).then((res) => {
    email.value = res.html
  })
})

const code = `import { codeToThemedTokens } from 'shiki'

const tokens = await codeToThemedTokens('<div class="foo">bar</div>', {
  lang: 'html',
  theme: 'min-dark'
})
`
</script>

<template>
  <Suspense>
    <ECodeBlock style="padding: 20px;" :code="code" lang="typescript" theme="dracula" />
  </Suspense>
  <ECodeInline>@vue-email/nuxt</ECodeInline>
  <iframe :srcdoc="email" />
</template>

<style scoped>
#app, body, html, iframe {
  width: 100%;
  height: 100vh;
}
</style>
