<script lang="ts" setup>
const route = useRoute()
const slug = route.params.slug as string

const { email, refresh, getEmail, render } = useEmail()

const emailTemplate = ref({
  html: '',
  txt: '',
})

await getEmail(slug)

watch(refresh, async () => {
  await loadMarkups()
})

async function loadMarkups() {
  if (!email.value.component) return
  const content = await render(email.value.component)

  if (content) emailTemplate.value = content
}

await loadMarkups()

useHead({
  title: email.value ? `${email.value.label}` : 'Email not found',
})
</script>

<template>
  <EmailPreview v-if="email" :slug="email.label" :template="emailTemplate" />
</template>
