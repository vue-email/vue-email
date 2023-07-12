<script lang="ts">
export default { name: 'EHeading' }
</script>
<template>
  <component
    :is="as"
    data-id="__vue-email-heading"
    :style="{
      ...styles,
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
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
import { withMargin, convertStyleStringToObj } from '../utils'
import type { CSSProperties } from 'vue'

interface Props {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  m?: string;
  mx?: string;
  my?: string;
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
  style?: CSSProperties;
}

const props = withDefaults(defineProps<Props>(), {
  as: 'h1',
  m: undefined,
  mx: undefined,
  my: undefined,
  mt: undefined,
  mr: undefined,
  mb: undefined,
  ml: undefined,
})

const styles =
  typeof props.style === 'string'
    ? convertStyleStringToObj(props.style)
    : props.style
</script>
