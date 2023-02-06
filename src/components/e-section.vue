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
import { CSSProperties } from 'vue';
import { styleToString } from '../utils';

interface Props extends Omit<HTMLTableElement, 'style'> {
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
