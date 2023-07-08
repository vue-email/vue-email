<template>
  <a data-id="__vue-email-button" :style="buttonStyle(px, py)">
    <span v-html="firstSpan" />
    <span :style="buttonTextStyle(py)">
      <slot />
    </span>
    <span v-html="secondSpan" />
  </a>
</template>

<script lang="ts" setup>
import { pxToPt } from '../utils';

const props = defineProps({
  px: {
    type: String,
    default: '0',
  },
  py: {
    type: String,
    default: '0',
  },
});

const y = Number.parseInt(props.py) * 2;
const textRaise = pxToPt(y.toString());

const buttonStyle = (py: string = '0', px: string = '0') => {
  return {
    lineHeight: '100%',
    textDecoration: 'none',
    display: 'inline-block',
    maxWidth: '100%',
    padding: `${py}px ${px}px`,
  };
};

const buttonTextStyle = (py: string = '0') => {
  return {
    maxWidth: '100%',
    display: 'inline-block',
    lineHeight: '120%',
    textDecoration: 'none',
    textTransform: 'none' as const,
    msoPaddingAlt: '0px',
    msoTextRaise: pxToPt(py),
  };
};

const firstSpan = `<!--[if mso]><i style="letter-spacing: ${props.px}px;mso-font-width:-100%;mso-text-raise:${textRaise}" hidden>&nbsp;</i><![endif]-->`;
const secondSpan = `<!--[if mso]><i style="letter-spacing: ${props.px}px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]-->`;
</script>
