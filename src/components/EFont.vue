<script lang="ts" setup>
import { defineComponent, h } from 'vue'

const props = withDefaults(defineProps<FontProps>(), {
	fallbackFontFamily: 'Arial',
	fontStyle: 'normal',
	fontWeight: 400,
})

type FallbackFont = 'Arial' | 'Helvetica' | 'Verdana' | 'Georgia' | 'Times New Roman'

type FontFormat = 'woff' | 'woff2' | 'truetype' | 'opentype' | 'embedded-opentype' | 'svg'

type FontWeight = 'normal' | 'bold' | 'bolder' | 'lighter' | number
type FontStyle = 'normal' | 'italic' | 'oblique'

interface FontProps {
	fontFamily: string
	fallbackFontFamily: FallbackFont | FallbackFont[]
	webFont?: {
		url: string
		format: FontFormat
	}
	fontStyle?: FontStyle
	fontWeight?: FontWeight
}

const src = props.webFont ? `src: url(${props.webFont.url}) format("${props.webFont.format}");` : ''

const styles = `@font-face {
font-family: "${props.fontFamily}";
font-style: ${props.fontStyle};
font-weight: ${props.fontWeight};
mso-font-alt: "${Array.isArray(props.fallbackFontFamily) ? props.fallbackFontFamily[0] : props.fallbackFontFamily}";
${src}
}

* {
font-family: "${props.fontFamily}", ${Array.isArray(props.fallbackFontFamily) ? props.fallbackFontFamily.join(', ') : props.fallbackFontFamily};
}`

const render = defineComponent(() => {
	return () =>
		h('style', undefined, {
			default: () => styles,
		})
})
</script>

<template>
	<render />
</template>
