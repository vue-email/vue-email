<template>
  <p :style="styleToString(styleDefault)">
    <slot />
  </p>
</template>

<script lang="ts" setup>
import { CSSProperties } from 'vue';
import { styleToString } from '../utils';

interface Props extends Omit<HTMLParagraphElement, 'style'> {
  style?: CSSProperties;
}

const props = defineProps<Props>();

const styleDefault = {
  fontSize: '14px',
  lineHeight: '24px',
  margin: '16px 0',
  ...props.style,
};
</script>
