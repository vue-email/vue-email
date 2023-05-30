<template>
  <table
    align="center"
    width="100%"
    v-bind="$props"
    data-id="__vue-email-row"
    :style="style"
    role="presentation"
    cellSpacing="0"
    cellPadding="0"
    :border="0"
  >
    <tbody style="width: 100%">
      <tr style="width: 100%">
        <slot />
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import { TableHTMLAttributes } from 'vue';

interface Props extends /* @vue-ignore */ Omit<TableHTMLAttributes, 'style'> {
  style?: any;
}

defineProps<Props>();
</script>
