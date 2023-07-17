# Markdown
A Markdown component that converts markdown to valid vue-email template code

## Getting started

Add the component to your email template. Include styles where needed.




```vue
<template>
      <e-markdown 
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
            :source="md" />
</template>

<script setup>
import { EMarkdown } from 'vue-email';

const md = `# Hello, World!`

</script>

```

### Props
| Name     |  type  | Required | default |                   Description                    |
| -------- | :----: | :------: | :-----: | :----------------------------------------------: |
| `source`   | string |  true    |         | Contains the markdown content that will be rendered in the email template  |
| `ContainerStyles`   | string |      |    "{}"     | Provide custom styles for the containing div that wraps the markdown content  |
| `CustomStyles` | string |        | "{}"  | Provide custom styles for the corresponding html element (p, h1, h2, etc.) |
