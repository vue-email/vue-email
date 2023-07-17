<template>
  <EHtml>
    <EMarkdown
      :custom-styles="{
        h1: { color: 'red' },
        h2: {
          color: 'blue',
        },
        codeInline: {
          background: 'grey',
        },
      }"
      :container-styles="{
        padding: '12px',
        border: 'solid 1px black',
      }"
      :source="md"
    />
  </EHtml>
</template>

<script setup lang="ts">
const md = ref('# Hello, World!')
</script>
