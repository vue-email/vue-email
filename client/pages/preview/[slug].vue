<script lang="ts" setup>
const route = useRoute()
const slug = route.params.slug as string

const { email, refresh, getEmail, render } = useEmail()

const emailTemplate = ref('')

await getEmail(slug)

watch(refresh, async () => {
  await loadMarkups()
})

async function loadMarkups() {
  if (!email.value.component) return
  const html = await render(email.value.component)

  emailTemplate.value = html
}

await loadMarkups()

useHead({
  title: email.value ? `${email.value.label}` : 'Email not found',
})
</script>

<template>
  <ClientOnly>
    <EmailPreview v-if="email" :slug="email.label" :template="emailTemplate" />
  </ClientOnly>
</template>
