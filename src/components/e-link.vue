<template>
  <a :style="styleToString(styleDefault)" :href="href" :target="target">
    <slot />
  </a>
</template>

<script lang="ts" setup>
import { CSSProperties } from 'vue';
import { styleToString } from '../utils';

interface Props extends Omit<HTMLLinkElement, 'style' | 'target'> {
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
