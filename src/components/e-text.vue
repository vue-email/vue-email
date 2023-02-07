<template>
  <p :style="styleToString(styleDefault)">
    <slot />
  </p>
</template>

<script lang="ts" setup>
import { styleToString } from '../utils';
import type { CSSProperties, HTMLAttributes } from 'vue';

interface Props extends Omit<HTMLAttributes, 'style'> {
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
