<template>
  <a style="color: #067df7; text-decoration: none;" :style="style" :href="href" :target="target">
    <slot />
  </a>
</template>

<script lang="ts" setup>
import type { CSSProperties, HTMLAttributes } from 'vue';

interface Props extends /* @vue-ignore */ Omit<HTMLAttributes, 'style' | 'target'> {
  style?: CSSProperties;
  target?: string;
  href: string;
}

withDefaults(defineProps<Props>(), {
  target: '_blank',
  href: '',
});
</script>
