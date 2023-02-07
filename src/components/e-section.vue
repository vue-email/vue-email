<template>
  <table
    :style="styleToString(styleDefaultTable)"
    align="center"
    border="0"
    cellPadding="0"
    cellSpacing="0"
    role="presentation"
  >
    <tbody>
      <tr :style="styleToString(styleDefaultTr)">
        <slot />
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import { styleToString } from '../utils';
import type { CSSProperties, HTMLAttributes } from 'vue';

interface Props extends Omit<HTMLAttributes, 'style'> {
  style?: CSSProperties;
}

const props = defineProps<Props>();

const styleDefaultTable = {
  width: '100%',
  ...props.style,
};

const styleDefaultTr = {
  display: 'grid',
  gridAutoColumns: 'minmax(0, 1fr)',
  gridAutoFlow: 'column',
};
</script>
