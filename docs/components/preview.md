# Preview
A preview text that will be displayed in the inbox of the recipient.

::: info
Email clients have this concept of “preview text” which gives insight into what’s inside the email before you open. A good practice is to keep that text under 90 characters.
:::

## Getting started
Add the component to your email template. Include styles where needed.

```vue
<template>
  <e-preview>Email preview text</e-preview>
</template>

<script setup>
import { EPreview } from 'vue-email';
</script>
```