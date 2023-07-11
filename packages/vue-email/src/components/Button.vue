<script lang="ts">
export default { name: 'EButton' }
</script>

<template>
  <a
    data-id="__vue-email-button"
    :style="buttonStyle(px, py)"
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
import { pxToPt } from '../utils'

const props = defineProps({
  px: {
    type: String,
    default: '0',
  },
  py: {
    type: String,
    default: '0',
  },
  target: {
    type: String,
    default: '_blank',
  },
  href: {
    type: String,
    required: true,
  },
})

const y = Number.parseInt(props.py) * 2
const textRaise = pxToPt(y.toString())

const buttonStyle = (py = '0', px = '0') => {
  return {
    lineHeight: '100%',
    textDecoration: 'none',
    display: 'inline-block',
    maxWidth: '100%',
    padding: `${py}px ${px}px`,
  }
}

const buttonTextStyle = (py = '0') => {
  return {
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
