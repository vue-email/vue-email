<template>
  <table
    v-bind="$props"
    align="center"
    width="100%"
    data-id="__vue-email-container"
    role="presentation"
    cellspacing="0"
    cellpadding="0"
    border="0"
    style="max-width: 37.5em"
    :style="style"
  >
    <tbody>
      <tr style="width: 100%">
        <td>
          <slot />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import type { TableHTMLAttributes } from 'vue';

interface Props extends /* @vue-ignore */ Omit<TableHTMLAttributes, 'style'> {
  style?: any;
}

defineProps<Props>();
</script>
