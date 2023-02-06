<template>
  <component
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
  />
</template>

<script lang="ts" setup>
import { CSSProperties } from 'vue';
import { styleToString, withMargin } from '../utils';

interface Props extends Omit<HTMLHeadingElement, 'style'> {
  style?: CSSProperties;
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
