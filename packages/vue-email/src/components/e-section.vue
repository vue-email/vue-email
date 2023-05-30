<template>
  <table
    align="center"
    width="100%"
    v-bind="$props"
    data-id="__vue-email-section"
    border="0"
    cellPadding="0"
    cellSpacing="0"
    role="presentation"
    :style="style"
  >
    <tbody>
      <tr>
        <td>
          <slot />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import type { TableHTMLAttributes, StyleValue } from 'vue';

interface Props extends /* @vue-ignore */ Omit<TableHTMLAttributes, 'style'> {
  style?: StyleValue;
}

defineProps<Props>();
</script>
