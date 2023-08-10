<script lang="ts" setup>
const route = useRoute()
const slug = route.params.slug as string

const { email, refresh, getEmail } = useEmail()

const emailTemplate = ref({
  vue: '',
  html: '',
  plainText: '',
})

await getEmail(slug)

watch(refresh, async () => {
  await loadMarkups()
})

async function loadMarkups() {
  console.log(email.value)

  // const vue = await getVueCode(email.value.component)
  // const html = await useRender(emailFile, null, { pretty: true })
  // const plainText = await useRender(emailFile, null, { plainText: true })
  // emailTemplate.value = {
  //   vue,
  //   html,
  //   plainText,
  // }
}

await loadMarkups()
</script>

<template>
  <ClientOnly>
    <!-- <EmailPreview v-if="email" :slug="email.label" :template="emailTemplate" /> -->
  </ClientOnly>
</template>
