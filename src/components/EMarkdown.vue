<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { StylesType } from '../types/markdown'
import { parseMarkdownToVueEmailJSX } from '../utils/markdown'

const props = withDefaults(defineProps<Props>(), {})

interface Props {
  source: string
  customStyles?: StylesType
  containerStyles?: CSSProperties
}

const html = parseMarkdownToVueEmailJSX(props.source, props.customStyles)
</script>

<template>
  <div data-id="__vue-email-markdown" :style="containerStyles" v-html="html"></div>
</template>
