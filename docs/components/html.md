# Html
A Vue html component to wrap emails.

### Getting started

Add the component to your email template. Include styles where needed.


```vue
<template>
  <e-html lang="en">
    <!-- ... -->
  </e-html>
</template>

<script setup>
import { EHtml } from 'vue-email';
</script>
```

### Props

| Name |  type  |  Default  |        Description        |
| ---- | :---:  |   :---:   | :-----------------------: |
| `lang` | string |     `en`    | Identify the language of text content on the email |
| `dir` | string |     `ltr`    | Identify the direction of text content on the email |