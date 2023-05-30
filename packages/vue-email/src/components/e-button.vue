<template>
  <a
    v-bind="$props"
    data-id="__vue-email-button"
    :href="href"
    :target="target"
    :style="styleToString(buttonStyle({ ...style, pX, pY }))"
  >
    <span v-html="firstSpan"></span>
    <span :style="styleToString(buttonTextStyle({ ...style, pX, pY }))">
      <slot />
    </span>
    <span v-html="secondSpan"></span>
  </a>
</template>

<script lang="ts" setup>
import { pxToPt, styleToString } from '../utils';
import type { LinkHTMLAttributes } from 'vue';

interface Props extends /* @vue-ignore */ Omit<LinkHTMLAttributes, 'style'> {
  href: string;
  target?: string;
  style?: any;
  pX?: number;
  pY?: number;
}

const props = withDefaults(defineProps<Props>(), {
  href: '',
  target: '_blank',
  pX: 0,
  pY: 0,
});

const y = props!.pY * 2;
const textRaise = pxToPt(y.toString());

const buttonStyle = (style?: Record<string, string | number> & { pY?: number; pX?: number }) => {
  const paddingY = style?.pY || 0;
  const paddingX = style?.pX || 0;

  return {
    ...style,
    lineHeight: '100%',
    textDecoration: 'none',
    display: 'inline-block',
    maxWidth: '100%',
    padding: `${paddingY}px ${paddingX}px`,
  };
};

const buttonTextStyle = (
  style?: Record<string, string | number | null> & { pY?: number; pX?: number }
) => {
  const paddingY = style?.pY || 0;

  return {
    ...style,
    maxWidth: '100%',
    display: 'inline-block',
    lineHeight: '120%',
    textDecoration: 'none',
    textTransform: 'none' as const,
    msoPaddingAlt: '0px',
    msoTextRaise: pxToPt(paddingY.toString()),
  };
};

const firstSpan = `<!--[if mso]><i style="letter-spacing: ${props.pX}px;mso-font-width:-100%;mso-text-raise:${textRaise}" hidden>&nbsp;</i><![endif]-->`;
const secondSpan = `<!--[if mso]><i style="letter-spacing: ${props.pX}px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]-->`;
</script>
