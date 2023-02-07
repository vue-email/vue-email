<template>
  <a :style="styleToString(styleDefault)" :href="href" :target="target">
    <slot />
  </a>
</template>

<script lang="ts" setup>
import { styleToString } from '../utils';
import type { CSSProperties, HTMLAttributes } from 'vue';

interface Props extends Omit<HTMLAttributes, 'style' | 'target'> {
  style?: CSSProperties;
  target?: string;
  href: string;
}

const props = withDefaults(defineProps<Props>(), {
  target: '_blank',
  href: '',
});

const styleDefault = {
  color: '#067df7',
  textDecoration: 'none',
  ...props.style,
};
</script>
