# Head
Contains head components, related to the document such as style and meta elements.

## Getting started
Add the component to your email template. Include children tags where needed.


```vue
<template>
  <e-head>
    <title>Email title</title>
    <meta name="description" content="Description" />
  </e-head>
</template>

<script setup>
import { EHead } from 'vue-email';
</script>
```