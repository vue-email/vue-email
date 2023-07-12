<script lang="ts">
export default { name: 'EButton' }
</script>

<template>
  <a
    data-id="__vue-email-button"
    :style="buttonStyle(py, px)"
    :href="href"
    :target="target"
  >
    <span v-html="firstSpan"></span>
    <span :style="buttonTextStyle(py)">
      <slot></slot>
    </span>
    <span v-html="secondSpan"></span>
  </a>
</template>

<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { pxToPt, convertStyleStringToObj } from '../utils'

interface Props {
  px?: string;
  py?: string;
  target?: string;
  href: string;
  style?: CSSProperties;
}

const props = withDefaults(defineProps<Props>(), {
  px: '0',
  py: '0',
  target: '_blank',
  href: '#',
})

const y = Number.parseInt(props.py) * 2
const textRaise = pxToPt(y.toString())
const styles =
  typeof props.style === 'string'
    ? convertStyleStringToObj(props.style)
    : props.style

const buttonStyle = (py = '0', px = '0') => {
  return {
    ...styles,
    lineHeight: '100%',
    textDecoration: 'none',
    display: 'inline-block',
    maxWidth: '100%',
    padding: `${py}px ${px}px`,
  }
}

const buttonTextStyle = (py = '0') => {
  return {
    ...styles,
    maxWidth: '100%',
    display: 'inline-block',
    lineHeight: '120%',
    textDecoration: 'none',
    textTransform: 'none' as const,
    msoPaddingAlt: '0px',
    msoTextRaise: pxToPt(py),
  }
}

const firstSpan = `<!--[if mso]><i style="letter-spacing: ${props.px}px;mso-font-width:-100%;mso-text-raise:${textRaise}" hidden>&nbsp;</i><![endif]-->`
const secondSpan = `<!--[if mso]><i style="letter-spacing: ${props.px}px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]-->`
</script>
