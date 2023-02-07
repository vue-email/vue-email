<template>
  <div id="__vue-email-preview" :style="styleToString(styleDefault)">
    {{ preview }}
    <div>
      {{ renderWhiteSpace(preview) }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { styleToString } from '../utils';
import type { HTMLAttributes } from 'vue';

interface Props extends HTMLAttributes {
  preview: string;
}

withDefaults(defineProps<Props>(), {
  preview: '',
});

const styleDefault = {
  display: 'none',
  overflow: 'hidden',
  lineHeight: '1px',
  opacity: 0,
  maxHeight: 0,
  maxWidth: 0,
};

const renderWhiteSpace = (text: string) => {
  const whiteSpaceCodes = '\xa0\u200C\u200B\u200D\u200E\u200F\uFEFF';
  return whiteSpaceCodes.repeat(150 - text.length);
};
</script>
