<template>
  <table
    align="center"
    width="100%"
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
import type { CSSProperties, HTMLAttributes } from 'vue';

interface Props extends /* @vue-ignore */ Omit<HTMLAttributes, 'style'> {
  style?: CSSProperties;
}

defineProps<Props>();
</script>
