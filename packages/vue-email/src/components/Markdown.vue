<script lang="ts">
export default { name: 'EMarkdown' }
</script>

<template>
  <div :style="containerStyles" v-html="html"></div>
</template>

<script setup lang="ts">
import type { StylesType } from '../types/markdown'
import { parseMarkdownToVueEmailJSX } from '../utils/markdown'
import type { CSSProperties } from 'vue'

interface Props {
  source: string;
  customStyles?: StylesType;
  containerStyles?: CSSProperties;
}

const props = withDefaults(defineProps<Props>(), {})

const html = parseMarkdownToVueEmailJSX(props.source, props.customStyles)
</script>

<style scoped></style>
