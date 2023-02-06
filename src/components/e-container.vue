<template>
  <div v-html="tableString"></div>
  <div style="{inlineStyle}">
    <slot />
  </div>
  <div v-html="contentString"></div>
</template>

<script lang="ts" setup>
import { CSSProperties } from 'vue';
import { styleToString } from '../utils';

interface Props extends Omit<HTMLDivElement, 'style'> {
  style?: CSSProperties;
}

const props = defineProps<Props>();

const styles = { maxWidth: '37.5em', ...props.style };
const inlineStyle = styleToString(styles);

const tableString = `
  <!--[if mso | IE]>
    <table role="presentation" width="100%" align="center" style="${inlineStyle}"><tr><td></td><td style="width:37.5em;background:#ffffff">
        <!
  [endif]-->`;

const contentString = `
  <!--[if mso | IE]>
    </td><td></td></tr></table>
    <!
  [endif]-->`;
</script>
