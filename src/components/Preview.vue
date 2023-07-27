<script lang="ts" setup>
import { computed, useSlots } from 'vue'

const PREVIEW_MAX_LENGTH = 150
const slots = useSlots()

const text = computed(() => {
	if (slots.default !== undefined) {
		const children = slots.default()[0].children as string
		const newText = Array.isArray(children) ? children.join('') : children

		return newText?.substring(0, PREVIEW_MAX_LENGTH)
	}

	return ''
})

function renderWhiteSpace(text: string) {
	if (text.length >= PREVIEW_MAX_LENGTH) {
		return null
	}

	const whiteSpaceCodes = '\xA0\u200C\u200B\u200D\u200E\u200F\uFEFF'

	return whiteSpaceCodes.repeat(PREVIEW_MAX_LENGTH - text.length)
}
</script>

<template>
	<div id="__vue-email-preview" style="display: none; overflow: hidden; line-height: 1px; opacity: 0; max-height: 0; max-width: 0">
		{{ text }}
		<div>
			{{ renderWhiteSpace(text) }}
		</div>
	</div>
</template>
