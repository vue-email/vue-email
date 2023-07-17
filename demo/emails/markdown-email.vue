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
const md = ref(`# Hello, World!

This is a **markdown** email.

## This is a heading 2

This is a \`code\` inline.

\`\`\`js
const a = 1
\`\`\`

![image](https://picsum.photos/200/300)


* list item 1
* list item 2
* list item 3

`)
</script>
