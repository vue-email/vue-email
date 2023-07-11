<script lang="ts" setup>
const route = useRoute()
const slug = route.params.slug as string

const { email, getEmail } = useEmail()

const emailTemplate = ref({
  html: '',
  plainText: '',
})

await getEmail(slug)
const emailFile: any = email.value
  ? resolveComponent(email.value.component)
  : null

watch(email, async (value) => {
  await loadMarkups()
})

async function loadMarkups() {
  if (!emailFile) return
  const html = await useRender(emailFile, null, { pretty: true })
  const plainText = await useRender(emailFile, null, { plainText: true })

  emailTemplate.value = {
    html,
    plainText,
  }
}

await loadMarkups()

useHead({
  title: email.value ? `${email.value.label}` : 'Email not found',
})
</script>

<template>
  <EmailPreview v-if="email" :slug="email.label" :template="emailTemplate" />
</template>
