<template>
  <a
    v-bind="$props"
    data-id="__vue-email-link"
    style="color: #067df7; text-decoration: none"
    :style="style"
    :href="href"
    :target="target"
  >
    <slot />
  </a>
</template>

<script lang="ts" setup>
import type { AnchorHTMLAttributes } from 'vue';

interface Props extends /* @vue-ignore */ Omit<AnchorHTMLAttributes, 'style' | 'target'> {
  style?: any;
  target?: string;
  href: string;
}

withDefaults(defineProps<Props>(), {
  target: '_blank',
  href: '',
});
</script>
