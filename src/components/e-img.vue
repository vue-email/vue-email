<template>
  <img :style="styleToString(styleDefault)" :alt="alt" :src="src" :width="width" :height="height" />
</template>

<script lang="ts" setup>
import { CSSProperties, HTMLAttributes } from 'vue';
import { styleToString } from '../utils';

interface Props extends Omit<HTMLAttributes, 'style' | 'width' | 'height'> {
  style?: CSSProperties;
  alt: string;
  src: string;
  width: string;
  height: string;
}

const props = withDefaults(defineProps<Props>(), {
  alt: '',
  src: '',
  width: '0',
  height: '0',
});

const styleDefault = {
  display: 'block',
  outline: 'none',
  border: 'none',
  textDecoration: 'none',
  ...props.style,
};
</script>
