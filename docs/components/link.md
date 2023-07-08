# Link
A hyperlink to web pages, email addresses, or anything else a URL can address.

## Getting started

Add the component to your email template. Include styles where needed.




```vue
<template>
  <e-link href="https://vuejs.org">Go to vue</e-link>
</template>

<script setup>
import { ELink } from 'vue-email';
</script>

```

### Props
| Name     |  type  | Required | default |                   Description                    |
| -------- | :----: | :------: | :-----: | :----------------------------------------------: |
| `href`   | string |   true   |         | Link to be triggered when the button is clicked  |
| `target` | string |          | _blank  | Specify the target attribute for the button link |