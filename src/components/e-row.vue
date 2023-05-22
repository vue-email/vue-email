<template>
  <table
    align="center"
    width="100%"
    data-id="vue-email-row"
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
import { HTMLAttributes } from 'vue';

interface Props extends /* @vue-ignore */ Omit<HTMLAttributes, 'style'> {
  style?: string;
}

defineProps<Props>();
</script>
