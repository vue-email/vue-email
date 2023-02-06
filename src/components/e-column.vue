<template>
  <td :style="styleToString(styleDefault)" role="presentation">
    <slot />
  </td>
</template>

<script lang="ts" setup>
import { CSSProperties } from 'vue';
import { styleToString } from '../utils';

interface Props extends Omit<HTMLTableColElement, 'style'> {
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
