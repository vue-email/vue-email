<template>
  <component
    v-bind="{
      ...$props,
      dataId: '__vue-email-heading',
    }"
    :is="as"
    :style="
      styleToString({
        ...withMargin({
          m,
          mx,
          my,
          mt,
          mr,
          mb,
          ml,
        }),
        ...style,
      })
    "
  >
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { styleToString, withMargin } from '../utils';
import type { HTMLAttributes } from 'vue';

interface Props extends /* @vue-ignore */ Omit<HTMLAttributes, 'style'> {
  style?: object;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  m?: string;
  mx?: string;
  my?: string;
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
}

withDefaults(defineProps<Props>(), {
  as: 'h1',
});
</script>
