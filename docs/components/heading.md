# Heading
A block of heading text.

## Getting started

Add the component to your email template. Include styles where needed.




```vue
<template>
  <e-heading as="h2">Lorem ipsum</e-heading>
</template>

<script setup>
import { ESection, EText } from 'vue-email';
</script>
```

### Props

| Name |  type  |  default |        Description        |
| ---- | :---:  |  :--:  | :-----------------------: |
|  `as`  | string |  `h1` | Render component as `h1`, `h2`, `h3`, `h4`, `h5`, `h6` |
| `m` | string |  | A shortcut for `margin` CSS property. |
| `mx` | string |  | A shortcut for `margin-left` and `margin-right` CSS properties. |
| `my` | string |  | A shortcut for `margin-top` and `margin-bottom` CSS properties. |
| `mt` | string |  | A shortcut for `margin-top` CSS property. |
| `mr` | string |  | A shortcut for `margin-right` CSS property. |
| `mb` | string |  | A shortcut for `margin-bottom` CSS property. |
| `ml` | string |  | A shortcut for `margin-left` CSS property. |