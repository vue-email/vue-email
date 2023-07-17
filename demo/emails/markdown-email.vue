<template>
  <EHtml>
    <EHead />
    <EPreview> Markdown email preview </EPreview>
    <EBody>
      <EContainer>
        <ESection>
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
        </ESection>
      </EContainer>
    </EBody>
  </EHtml>
</template>

<script setup lang="ts">
const md = ref(`# This is a ~~chair~~ Table

| Heading 1 | Heading 2 |
| --------- | --------- |
| Cell 1    | Cell 2    |
| Cell 3    | Cell 4    |
`)
</script>
