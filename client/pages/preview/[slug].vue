<script lang="ts" setup>
const route = useRoute()
const slug = route.params.slug as string

const { email, refresh, getEmail, getVueCode } = useEmail()

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
	const component = await resolveComponent(email.value.component)
	const vue = await getVueCode(email.value.label)

	const html = await useRender(h(component), null, { pretty: true })
	const plainText = await useRender(h(component), null, { plainText: true })

	emailTemplate.value = {
		vue,
		html,
		plainText,
	}
}

await loadMarkups()
</script>

<template>
	<EmailPreview v-if="email" :slug="email.label" :template="emailTemplate" />
</template>
