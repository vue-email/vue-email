<template>
  <component
    :is="as"
    data-id="__vue-email-heading"
    :style="{
      ...withMargin({
        m,
        mx,
        my,
        mt,
        mr,
        mb,
        ml,
      }),
    }"
  >
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { withMargin } from '../utils';
import { PropType } from 'vue';

defineProps({
  as: {
    type: String as PropType<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>,
    default: 'h1',
  },
  m: {
    type: String,
    default: undefined,
    required: false,
  },
  mx: {
    type: String,
    default: undefined,
    required: false,
  },
  my: {
    type: String,
    default: undefined,
    required: false,
  },
  mt: {
    type: String,
    default: undefined,
    required: false,
  },
  mr: {
    type: String,
    default: undefined,
    required: false,
  },
  mb: {
    type: String,
    default: undefined,
    required: false,
  },
  ml: {
    type: String,
    default: undefined,
    required: false,
  },
});
</script>
