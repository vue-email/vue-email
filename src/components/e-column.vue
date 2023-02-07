<template>
  <td :style="styleToString(styleDefault)" role="presentation">
    <slot />
  </td>
</template>

<script lang="ts" setup>
import { styleToString } from '../utils';
import type { CSSProperties, HTMLAttributes } from 'vue';

interface Props extends Omit<HTMLAttributes, 'style'> {
  style?: CSSProperties;
}

const props = defineProps<Props>();

const styleDefault = {
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  ...props.style,
};
</script>
